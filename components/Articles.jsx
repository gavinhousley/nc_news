import { Link, useState } from "react";
import { useEffect } from "react";
import ArtCard from "./ArtCard";

function Articles() {
  const [articles, setArticles] = useState([]);
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
      <table>
        <thead>
          <tr>
            <th>author</th>
            <th>title</th>
            <th>topic</th>
            <th>date created</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((art) => (
            <ArtCard
              key={art.article_id}
              author={art.author}
              title={art.title}
              topic={art.topic}
              released={art.created_at}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
