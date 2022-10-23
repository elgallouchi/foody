import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipeSlice";
export default configureStore({ reducer: { recipe: recipeSlice } });
