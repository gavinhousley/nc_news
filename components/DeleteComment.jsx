const DeleteComment = ({ comment_id, removeComment }) => {
  async function deleteComment(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://back-end-nc-news-5cp2.onrender.com/api/comments/${comment_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) {
        throw new Error("comment not deleted");
      }
      removeComment(comment_id);
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  }
  return (
    <>
      <span>
        <button className="delete-button" onClick={deleteComment}>
          Delete
        </button>
      </span>
    </>
  );
};

export default DeleteComment;
