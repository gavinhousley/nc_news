const ArtCard = ({ image, author, title, topic, released }) => {
  return (
    <tr className="art-row">
      <td>
        <img src={image} width="100px" alt={title} />
      </td>
      <td>{author}</td>
      <td>{title}</td>
      <td>{topic}</td>
      <td>{released}</td>
    </tr>
  );
};

export default ArtCard;
