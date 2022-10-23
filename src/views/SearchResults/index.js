import React, { useEffect } from "react";
import "./index.css";
import CardPost from "../../components/CardPost";
import SideBar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getBySearch } from "../../store/recipeSlice";

export default function index() {
  const dispatch = useDispatch();
  const { articles, loading } = useSelector((state) => state.recipe);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("q");
    const text = searchParams.get("search");
    dispatch(getBySearch({ query, text }));
  }, [dispatch, searchParams]);

  return (
    <main>
      <section id="search-results">
        <div className="container">
          <SideBar />
          <div className="search-results-items">
            {loading ? (
              "Loading..."
            ) : articles === null ? (
              <div className="not-results-found">No Result Found</div>
            ) : (
              articles.map((card) => (
                <CardPost
                  key={card.idMeal}
                  id={card.idMeal}
                  img={card.strMealThumb}
                  title={card.strMeal}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
