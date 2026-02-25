import { Link, useState } from "react";
import { useEffect } from "react";
import ArtCard from "./ArtCard";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [singleArticle, setSingleArticle] = useState([]);
  useEffect(() => {
    // want it to be async but can't directly
    // I'll make my own (wrap it)
    async function fetchArticles() {
      const response = await fetch(
        "https://back-end-nc-news-5cp2.onrender.com/api/articles",
      );
      const allArticles = await response.json();
      console.log(allArticles.articles);
      setArticles(allArticles.articles || []);
      return allArticles;
    }
    fetchArticles();
  }, []);
  return (
    <div className="articles-main">
      <div>
        {articles.map((art) => (
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
        ))}
      </div>
    </div>
  );
}

export default Articles;
