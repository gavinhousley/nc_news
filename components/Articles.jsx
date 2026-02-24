import { Link } from "react";

function Articles() {
  const articles = ["these are my articles", "and this is another one"];
  return (
    <section>
      <h3>Articles</h3>
      <ul>
        {articles.map((art) => {
          return (
            <li>
              <Link>{art}</Link>
            </li>
          );
        })}
        ;
      </ul>
    </section>
  );
}

export default Articles;
