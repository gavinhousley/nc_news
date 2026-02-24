import { useState } from "react";
import { Route, Routes } from "router";

import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Articles from "../components/Articles";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
