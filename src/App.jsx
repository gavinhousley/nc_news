import { useState, useEffect, use } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Articles from "../components/Articles";
import SingleArticle from "../components/SingleArticle";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://back-end-nc-news-5cp2.onrender.com/api/articles",
        );

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
  }, []);

  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles articles={articles} />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
