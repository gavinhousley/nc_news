const TopicCard = ({ slug, description }) => {
  return (
    <div className="topic-card">
      <span className="topics-slug">{slug}</span>
      <span className="topic-description">{description}</span>
    </div>
  );
};

export default TopicCard;
