const TopicCard = ({ slug, description }) => {
  return (
    <div className={`topic-card topic-${slug}`}>
      <span className="topics-slug">{slug}</span>
      <span className="topic-description">{description}</span>
    </div>
  );
};

export default TopicCard;
