const ArtCard = ({ author, title, topic, released }) => {
  return (
    <tr className="art-row">
      <td>{author}</td>
      <td>{title}</td>
      <td>{topic}</td>
      <td>{released}</td>
    </tr>
  );
};

export default ArtCard;
