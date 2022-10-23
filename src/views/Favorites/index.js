import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardPost from "../../components/CardPost";
import "./index.css";

export default function Favorites() {
  const { localState } = useSelector((state) => state.recipe);
  const [onLine, setOnLine] = useState(window.navigator.onLine);
  useEffect(() => {
    setOnLine(window.navigator.onLine);
    window.addEventListener("online", () => setOnLine(window.navigator.onLine));
    window.addEventListener("offline", () =>
      setOnLine(window.navigator.onLine)
    );
  }, [onLine]);

  return (
    <section className="favorites">
      <div className="container">
        <h2>My Favorites recipes</h2>
        <div className="favorites-items">
          {onLine ? (
            !localState.length ? (
              <div className="no-favorites">
                <p>you dont have recipe favorite</p>
                go to home <Link to="/food-recipes">home</Link>
              </div>
            ) : (
              localState.map((card) => (
                <CardPost
                  key={card.idMeal}
                  id={card.idMeal}
                  img={card.strMealThumb}
                  title={card.strMeal}
                />
              ))
            )
          ) : (
            <div className="no-favorites">
              <h4>There is no internet connexion</h4>
              <p>Your device is offline</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
