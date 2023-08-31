import React, { useEffect, useState } from "react";
import "./index.css";
import { MdFavorite } from "react-icons/md";
import CardPost from "../../components/CardPost";
import FormSearch from "../../components/FormSearch";
import { useDispatch, useSelector } from "react-redux";
import {
  getByArea,
  getByCategory,
  getRandomRecipe,
} from "../../store/recipeSlice";
import { Link, useNavigate, usNavigation } from "react-router-dom";

export default function Home() {
  const [countries, setCountries] = useState(["French", "Italian", "Moroccan"]);
  const navigate = useNavigate();
  const { category, area, randomRecipe } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getByCategory());
    dispatch(getByArea());
    // dispatch(getRandomRecipe());
  }, [dispatch]);

  // redirection to category
  const btnToCategory = ({ option, text }) => {
    navigate({
      pathname: "/foody/results",
      search: `?q=${option}&search=${text}`,
    });
  };
  return (
    <main className="home">
      {/* Hero section */}
      <section
        id="hero"
        style={{ backgroundImage: `url("/assets/images/perfect-arepas.jpg")` }}
      >
        <div className="background-hero">
          <div className="container">
            <div className="hero">
              <h2>
                <span>Making food great</span> again and again
              </h2>
              <button>Explore</button>
            </div>
            <FormSearch />
          </div>
        </div>
      </section>
      {/* Area section */}
      <section id="recipes">
        <div className="container">
          <h2>Area Recipes</h2>
          <div className="area-items">
            {countries.map((area, index) => (
              <Link to={`/foody/results?q=a&search=${area}`} key={index}>
                <div className="area-item">
                  <img src={`/assets/flags/${area}.svg`} loading="lazy" alt={area} />
                  <h3>{area}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Recipes By Area */}
      <section id="recipes-categories">
        <div className="container">
          <h2>Category</h2>
          <div className="recipes-categories">
            {category.slice(8, 11).map((cat, index) => (
              <div className="category-container" key={index}>
                <div className="top-category">
                  <img
                    src={cat.strCategoryThumb}
                    loading="lazy"
                    alt={cat.strCategory}
                  />
                </div>
                <div className="bottom-category">
                  <h3>{cat.strCategory}</h3>
                  <p>{cat.strCategoryDescription.slice(0, 70) + "..."}</p>
                  <button
                    onClick={() =>
                      btnToCategory({ option: "c", text: cat.strCategory })
                    }
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
