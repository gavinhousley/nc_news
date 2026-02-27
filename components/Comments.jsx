import { useParams } from "react-router";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard.jsx";

function Comments() {
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [comBody, setComBody] = useState("");
  const [comments, setComments] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  async function postComment(e) {
    e.preventDefault();
    console.log({ username: userName, body: comBody });
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
      console.log(response);
    } catch (err) {}
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
            <label>
              Username:
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
              />
            </label>
            <label>
              Comment:
              <input
                value={comBody}
                onChange={(e) => setComBody(e.target.value)}
                type="text"
              />
            </label>
            <button type="submit">submit</button>
          </form>
        )}
        {comments.map((comment) => (
          <CommentCard
            key={comment.comment_id}
            author={comment.author}
            body={comment.body}
            released={new Date(comment.created_at).toLocaleDateString()}
            votes={comment.votes}
          />
        ))}
      </div>
    </>
  );
}

export default Comments;
