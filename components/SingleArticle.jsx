import { useParams } from "react-router";
import FullArtCard from "./FullArtCard";
import { useEffect, useState } from "react";
import Comments from "./Comments";

function SingleArticle() {
  const [singleArticle, setSingleArticle] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    async function fetchSingleArticle() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://back-end-nc-news-5cp2.onrender.com/api/articles/${article_id}`,
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.msg || "Article not found");
        }
        setSingleArticle(data.article);
        setError(null);
      } catch (err) {
        setError(err);
        setSingleArticle(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSingleArticle();
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Sorry, that article does not exist.</p>;
  }

  async function changeVote(num) {
    setSingleArticle({ ...singleArticle, votes: singleArticle.votes + num });
    try {
      const response = await fetch(
        `https://back-end-nc-news-5cp2.onrender.com/api/articles/${article_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inc_votes: num }),
        },
      );
      if (!response.ok) {
        throw new Error("vote not registering");
      }
    } catch (err) {
      setSingleArticle({ ...singleArticle, votes: singleArticle.votes - num });
    }
  }
  return (
    <>
      <div className="single-article">
        <FullArtCard
          key={singleArticle.article_id}
          image={singleArticle.article_img_url}
          author={singleArticle.author}
          title={singleArticle.title}
          topic={singleArticle.topic}
          body={singleArticle.body}
          released={new Date(singleArticle.created_at).toLocaleDateString()}
          changeVote={changeVote}
          commentCount={singleArticle.comment_count}
          votes={singleArticle.votes}
        />
      </div>

      <div className="comments-list">
        <Comments />
      </div>
    </>
  );
}

export default SingleArticle;
