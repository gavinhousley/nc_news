const FullArtCard = ({
  image,
  author,
  title,
  topic,
  body,
  released,
  commentCount,
  votes,
}) => {
  return (
    <div className="art-card">
      <div className="art-image">
        <img src={image} alt={title} />
      </div>
      <div className="art-info">
        <span className="art-topic">{topic}</span>
        <span className="art-released">{released}</span>
        <span className="art-author">{author}</span>
        <span className="art-title">{title}</span>
        <span className="art-body">{body}</span>
        <span className="art-comment-count">Comment count: {commentCount}</span>
        <span className="art-votes">No. of Votes: {votes}</span>
      </div>
    </div>
  );
};

export default FullArtCard;
