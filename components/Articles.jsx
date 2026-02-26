import { Link } from "react-router";
import ArtCard from "./ArtCard";

function Articles({ articles }) {
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
