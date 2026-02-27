import { useParams } from "react-router";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard.jsx";

function Comments() {
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

  //  async function PostComment() {
  //     const {};
  //     try {
  //       const response = await fetch(
  //         `https://back-end-nc-news-5cp2.onrender.com/api/articles/${article_id}/comments`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ username: userName, body: commentBody} ),
  //         },
  //       );
  //       if (!response.ok) {
  //         throw new Error("new comment not registering");
  //       }
  //     } catch (err) {
  //       setSingleArticle({ ...singleArticle, votes: singleArticle.votes - num });
  //     }
  //   }
  const commentsLength = comments.length;

  return (
    <>
      <div className="comments">
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
