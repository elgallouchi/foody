import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllArea } from "../../store/recipeSlice";
import "./index.css";

export default function Area() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allArea } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getAllArea());
  }, [dispatch]);

  // redirection to category
  const btnToCategory = (areaName) => {
    navigate({
      pathname: "/foody/results",
      search: `?q=a&search=${areaName}`,
    });
  };

  return (
    <main id="area">
      <div className="container">
        <h2>Area Recipes</h2>
        <ul>
          {allArea &&
            allArea.map((area, index) => (
              <li key={index} onClick={() => btnToCategory(area.strArea)}>
                <img
                  src={`/foody/assets/flags/${
                    area.strArea === "Unknown" ? "reste" : area.strArea
                  }.svg`}
                  alt={area.strArea === "Unknown" ? "reste" : area.strArea}
                  loading="lazy"
                />
                <h3>{area.strArea === "Unknown" ? "Reste" : area.strArea}</h3>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
