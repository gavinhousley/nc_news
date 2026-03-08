import { useParams } from "react-router";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard.jsx";

function Comments() {
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [comBody, setComBody] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const { article_id } = useParams();

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
          body: JSON.stringify({ username: userName, body: comBody }),
        },
      );
      if (!response.ok) {
        throw new Error("new comment not registering");
      }
      const data = await response.json();
      setComments([data.comment, ...comments]);
      setStatus("success");
      setUserName("");
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
        <button className="add-comment" onClick={() => setShowForm(true)}>
          Add new comment
        </button>
        {showForm && (
          <form className="comment-form" onSubmit={postComment}>
            <h3>add Comment</h3>
            <p>You are logged in as tickle122</p>
            <label>
              Username:
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                required
              />
            </label>
            <label>
              Comment:
              <input
                value={comBody}
                onChange={(e) => setComBody(e.target.value)}
                type="text"
                required
              />
            </label>
            <button type="submit">submit</button>
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
