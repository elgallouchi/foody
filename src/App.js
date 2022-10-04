import Home from "./views/Home";
import React from "react";
import "./index.css";
import Article from "./views/Article";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchResults from "./views/SearchResults";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
