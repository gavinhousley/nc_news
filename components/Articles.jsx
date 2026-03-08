import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import ArtCard from "./ArtCard";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { topic } = useParams();

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const url = topic
          ? `https://back-end-nc-news-5cp2.onrender.com/api/articles?topic=${topic}`
          : `https://back-end-nc-news-5cp2.onrender.com/api/articles`;

        const response = await fetch(url);

        const data = await response.json();
        setArticles(data.articles);
        setError(null);
      } catch (err) {
        setError(err);
        setArticles(null);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [topic]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Apologies, something went wrong</p>;
  }
  return (
    <div className="articles-main">
      <div>
        {articles.map((art) => (
          <Link key={art.article_id} to={`/articles/${art.article_id}`}>
            <ArtCard
              key={art.article_id}
              image={art.article_img_url}
              author={art.author}
              title={art.title}
              topic={art.topic}
              released={new Date(art.created_at).toLocaleDateString()}
              commentCount={art.comment_count}
              votes={art.votes}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Articles;
