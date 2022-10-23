import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { getById, toggleArticleLocalStorage } from "../../store/recipeSlice";
import "./index.css";
import Loader from "../../components/Loader";
import { AiFillLike } from "react-icons/ai";
import SimilarRecipes from "../../components/SimilarRecipes";

import Skeleton from "../../components/Skeleton";

export default function Article() {
  const { oneArticle, loading, localState } = useSelector(
    (state) => state.recipe
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const idMeal = parseInt(searchParams.get("p"));

  useEffect(() => {
    dispatch(getById(idMeal));
  }, [dispatch, localState, idMeal]);

  const ingredients = (oneArticle) => {
    let ingredientArray = [];
    let measureArray = [];
    let emptyObject = {};

    // retrieve ingredients and measures from article object
    Object.entries(oneArticle).forEach((element) => {
      if (
        element[0].includes("strIngredient") &&
        element[1] !== null &&
        element[1] !== ""
      ) {
        ingredientArray.push([element[1]]);
      }
      if (
        element[0].includes("strMeasure") &&
        element[1] !== null &&
        element[1] !== ""
      ) {
        measureArray.push(element[1]);
      }
    });

    // full emptyObject with two arrays
    ingredientArray.forEach(
      (el, index) => (emptyObject[el] = measureArray[index])
    );

    // transform object to array
    const res = Object.entries(emptyObject);

    // maping array
    return res.map((el, index) => (
      <tr key={index}>
        <td>{el[0]}</td>
        <td>{el[1]}</td>
      </tr>
    ));
  };
  return (
    <main id="article-main">
      <div className="container">
        <article id="article">
          <div className="container">
            {/* {!loading ? (
              <>
                <Skeleton width="100px" />
                <Skeleton width={"100%"} height={"50vh"} />
                <Loader width={"100%"} height={"50vh"} />
              </>
            ) : ( */}
            <div className="article-details">
              <div className="article-top">
                <div className="article-thumb">
                  {loading ? (
                    <Skeleton width={"100%"} height={"50vh"} />
                  ) : (
                    <img
                      src={oneArticle.strMealThumb}
                      alt={oneArticle.strMeal}
                      loading="lazy"
                    />
                  )}

                  {!loading &&
                  localState.some((element) => element.idMeal === idMeal) ? (
                    <AiFillLike
                      onClick={() =>
                        dispatch(
                          toggleArticleLocalStorage({
                            idMeal: idMeal,
                            strMealThumb: oneArticle.strMealThumb,
                            strMeal: oneArticle.strMeal,
                          })
                        )
                      }
                      className="btn-fav added y"
                    />
                  ) : (
                    <AiFillLike
                      onClick={() =>
                        dispatch(
                          toggleArticleLocalStorage({
                            idMeal: idMeal,
                            strMealThumb: oneArticle.strMealThumb,
                            strMeal: oneArticle.strMeal,
                          })
                        )
                      }
                      className="btn-fav x"
                    />
                  )}
                </div>
                <div className="article-ingredients">
                  <h2>
                    {loading ? <Skeleton width={"60%"} /> : oneArticle.strMeal}
                  </h2>
                  <h4>Ingredients</h4>
                  <table>
                    <tbody>{oneArticle && ingredients(oneArticle)}</tbody>
                  </table>
                </div>
              </div>
              <div className="article-instructions">
                <h4>Instructions</h4>
                {loading ? (
                  <>
                  <Skeleton width={"90%"} />
                  <Skeleton width={"70%"} />
                  <Skeleton width={"80%"} />
                  <Skeleton width={"30%"} />
                  <Skeleton width={"40%"} />
                  </>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        oneArticle.strInstructions &&
                        oneArticle.strInstructions,
                    }}
                  />
                )}
                <div className="article-footer">
                  <div className="category">
                    Category :{" "}
                    {loading ? <Skeleton width={"15%"}  /> : (

                      <span>
                      <Link
                        to={`/results?q=c&search=${oneArticle &&
                          oneArticle.strCategory}`}
                          >
                        {oneArticle && oneArticle.strCategory}
                      </Link>
                    </span>
                        )}
                  </div>
                  <div className="tags">
                    Tags : {loading ? <Skeleton width={"10%"}  /> : oneArticle.strTags && oneArticle.strTags}
                  </div>
                </div>
              </div>
            </div>
            {/* )} */}
            <SimilarRecipes />
          </div>
        </article>
        <Sidebar />
      </div>
    </main>
  );
}
