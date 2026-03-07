import { useContext } from "react";
import { UserContext } from "./context/User";
import DeleteComment from "./DeleteComment";

const CommentCard = ({
  author,
  title,
  body,
  votes,
  released,
  removeComment,
  comment_id,
}) => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="comment-card">
      <span className="comment-author">{author}</span>
      <span className="comment-released">{released}</span>
      <span className="comment-title">{title}</span>
      <span className="comment-body">{body}</span>
      <span className="comment-votes">No. of Votes: {votes}</span>
      {author === loggedInUser.username && (
        <DeleteComment comment_id={comment_id} removeComment={removeComment} />
      )}
    </div>
  );
};

export default CommentCard;
