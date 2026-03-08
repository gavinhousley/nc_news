import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import ArtCard from "./ArtCard";
import { useSearchParams } from "react-router";

function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { topic } = useParams();

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const url = topic
          ? `https://back-end-nc-news-5cp2.onrender.com/api/articles?topic=${topic}&sort_by=${sortBy}&order=${order}`
          : `https://back-end-nc-news-5cp2.onrender.com/api/articles?sort_by=${sortBy}&order=${order}`;

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
  }, [topic, searchParams]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Apologies, something went wrong</p>;
  }
  if (articles.length === 0) {
    return (
      <div>
        <p>There doesn't seem to be a topic with that name here</p>
        <Link to="/">Back to Home</Link>;
      </div>
    );
  }

  return (
    <div className="articles-main">
      <div className="sort-controls">
        <select
          name="Sort By"
          value={sortBy}
          onChange={(e) =>
            setSearchParams({ sort_by: e.target.value, order: order })
          }
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <select
          name="Order"
          value={order}
          onChange={(e) =>
            setSearchParams({ sort_by: sortBy, order: e.target.value })
          }
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
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
