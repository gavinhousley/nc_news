const CommentCard = ({ author, title, body, votes }) => {
  return (
    <div className="comment-card">
      {/* <span className="comment-released">{released}</span> */}
      <span className="comment-author">{author}</span>
      <span className="comment-title">{title}</span>
      <span className="comment-body">{body}</span>
      <span className="comment-votes">No. of Votes: {votes}</span>
    </div>
  );
};

export default CommentCard;
