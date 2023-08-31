import React, { useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleArticleLocalStorage } from "../../store/recipeSlice";

export default function CardPost({ title, img, id }) {
  const { localState } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  const idMeal = parseInt(id);

  return (
    <div className="recipe-item">
      <img width="100" height="100" src={img}  loading="lazy" className="recipe-image" />
      <h3>{title}</h3>
      <div className="btn-read-article">
        <Link
          to={`/foody/article?p=${idMeal}
        `}
          className="read-article"
        >
          Read article &#10230;
        </Link>
        {localState.some((element) => element.idMeal === idMeal) ? (
          <AiFillLike
            className="btn-favorite added"
            onClick={() =>
              dispatch(
                toggleArticleLocalStorage({
                  idMeal: idMeal,
                  strMealThumb: img,
                  strMeal: title,
                })
              )
            }
          />
        ) : (
          <AiFillLike
            className="btn-favorite"
            onClick={() =>
              dispatch(
                toggleArticleLocalStorage({
                  idMeal: idMeal,
                  strMealThumb: img,
                  strMeal: title,
                })
              )
            }
          />
        )}
      </div>
    </div>
  );
}
