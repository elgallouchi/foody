import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";
import "./index.css";

export default function SimilarRecipes() {
  const { similarRecipe, loading } = useSelector((state) => state.recipe);

  return (
    <div className="similar-recipes">
      <div className="container">
        <h2>Similar Recipes</h2>
        <div className="similar-recipes-items">
          {loading ? (
            <>
              <Skeleton  height={"10rem"} />
              <Skeleton  height={"10rem"} />
              <Skeleton  height={"10rem"} />
            </>
          ) : (
            similarRecipe.slice(0, 3).map((element) => (
              <div className="similar-recipes-item" key={element.idMeal}>
                <Link to={`/article?p=${element.idMeal}`}>
                  <img
                    src={element.strMealThumb}
                    loading="lazy"
                    alt={element.strMeal}
                  />
                  <h3>{element.strMeal}</h3>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
