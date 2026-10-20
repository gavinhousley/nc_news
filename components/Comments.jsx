import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/User";
import CommentCard from "./CommentCard.jsx";

function Comments() {
  const { loggedInUser } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [comBody, setComBody] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [avatars, setAvatars] = useState({});

  const { article_id } = useParams();

  useEffect(() => {
    async function getAvatars() {
      try {
        const response = await fetch(
          `https://back-end-nc-news-5cp2.onrender.com/api/users`,
        );
        const data = await response.json();
        const lookup = {};
        data.users.forEach((user) => {
          lookup[user.username] = user.avatar_url;
        });
        setAvatars(lookup);
      } catch (err) {
        // no avatars - comment cards fall back to the user's initial
      }
    }
    getAvatars();
  }, []);

  useEffect(() => {
    async function getComments() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://back-end-nc-news-5cp2.onrender.com/api/articles/${article_id}/comments`,
        );

        const data = await response.json();
        setComments(data.comments);
        setError(null);
      } catch (err) {
        setError(err);
        setComments(null);
      } finally {
        setLoading(false);
      }
    }
    getComments();
  }, [article_id]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  async function postComment(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://back-end-nc-news-5cp2.onrender.com/api/articles/${article_id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: loggedInUser.username,
            body: comBody,
          }),
        },
      );
      if (!response.ok) {
        throw new Error("new comment not registering");
      }
      const data = await response.json();
      setComments([data.comment, ...comments]);
      setStatus("success");
      setComBody("");
    } catch (err) {
      setStatus("error");
    }
  }

  function removeComment(comment_id) {
    setComments(
      comments.filter((comment) => comment.comment_id !== comment_id),
    );
  }

  return (
    <>
      <div className="comments">
        {!showForm && (
          <button className="add-comment" onClick={() => setShowForm(true)}>
            Add new comment
          </button>
        )}
        {showForm && (
          <form className="comment-form" onSubmit={postComment}>
            <h3>Add Comment</h3>
            <p>Posting as {loggedInUser.username}</p>
            <label>
              Comment:
              <input
                value={comBody}
                onChange={(e) => setComBody(e.target.value)}
                type="text"
                required
              />
            </label>
            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowForm(false);
                  setComBody("");
                }}
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        )}

        {status === "success" && <p>Your comment has been posted.</p>}
        {status === "error" && (
          <p style={{ color: "red" }}>
            There has been an error. Please try again.
          </p>
        )}

        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            author={comment.author}
            avatar={avatars[comment.author]}
            body={comment.body}
            released={new Date(comment.created_at).toLocaleDateString()}
            votes={comment.votes}
            comment_id={comment.comment_id}
            removeComment={removeComment}
          />
        ))}
      </div>
    </>
  );
}

export default Comments;
