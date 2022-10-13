import Home from "./views/Home";
import React, { useEffect } from "react";
import "./index.css";
import Article from "./views/Article";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchResults from "./views/SearchResults";

import { getByCategory, getFromLocalStorage } from "./store/recipeSlice";
import { useDispatch } from "react-redux";
import Favorites from "./views/Favorites";
import Footer from "./components/Footer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByCategory());
    dispatch(getFromLocalStorage());
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
