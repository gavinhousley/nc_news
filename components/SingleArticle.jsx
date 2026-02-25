import { Link } from "react";
import { useState } from "react";
import { useParams } from "react-router";

function SingleArticle(article_id) {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    // want it to be async but can't directly
    // I'll make my own (wrap it)
    async function getArticle(article_id) {
      const response = await fetch(
        `https://back-end-nc-news-5cp2.onrender.com/api/articles/${article_id}`,
      );
      const article = await response.json();
      setArticle(article || []);
      return article;
    }
    getArticle();
  }, []);
  return (
    <div className="single-article">
      <div>
        <FullArtCard
          key={art.article_id}
          image={art.article_img_url}
          author={art.author}
          title={art.title}
          topic={art.topic}
          body={art.body}
          released={new Date(art.created_at).toLocaleDateString()}
          commentCount={art.comment_count}
          votes={art.votes}
        />
      </div>
    </div>
  );
}

export default SingleArticle;
