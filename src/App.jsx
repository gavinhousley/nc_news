import { useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Articles from "../components/Articles";
import SingleArticle from "../components/SingleArticle";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
