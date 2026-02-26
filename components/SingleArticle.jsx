import { useParams } from "react-router";
import FullArtCard from "./FullArtCard";
import { useEffect, useState } from "react";

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
        setSingleArticle(data.article);
        setError(null);
      } catch (err) {
        setError(err);
        setArticles(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSingleArticle();
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="single-article">
      <div>
        <FullArtCard
          key={singleArticle.article_id}
          image={singleArticle.article_img_url}
          author={singleArticle.author}
          title={singleArticle.title}
          topic={singleArticle.topic}
          body={singleArticle.body}
          released={new Date(singleArticle.created_at).toLocaleDateString()}
          commentCount={singleArticle.comment_count}
          votes={singleArticle.votes}
        />
      </div>
    </div>
  );
}

export default SingleArticle;
