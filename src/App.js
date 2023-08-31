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
import Area from "./views/Area";
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
        <Route path="/foody/" element={<Home />} />
        <Route path="/foody/article" element={<Article />} />
        <Route path="/foody/results" element={<SearchResults />} />
        <Route path="/foody/favorites" element={<Favorites />} />
        <Route path="/foody/area" element={<Area />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
