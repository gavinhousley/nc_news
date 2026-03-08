import { Route, Routes } from "react-router";
import { UserProvider } from "../components/context/User";

import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Articles from "../components/Articles";
import SingleArticle from "../components/SingleArticle";
import Comments from "../components/Comments";
import Topics from "../components/Topics";

function App() {
  return (
    <UserProvider>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/articles/:article_id/comments" element={<Comments />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/articles/topic/:topic" element={<Articles />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
