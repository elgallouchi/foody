  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import axios from "axios";

// get recipes by category
export const getByCategory = createAsyncThunk(
  "getByCategory",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// get recipes by area
export const getByArea = createAsyncThunk(
  "getByArea",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      const randomNumber = () => 0.5 - Math.random();
      return [...response.data.meals.sort(randomNumber)];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get similar recipes by category /!\ Random
export const getSimilarByCategory = createAsyncThunk(
  "getSimilarByCategory",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const randomNumber = () => 0.5 - Math.random();
      return [...response.data.meals.sort(randomNumber)];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// category :       www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// ingredients :    www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast,garlic,salt
// area :           www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
// name :           www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

// get recipes by search form
export const getBySearch = createAsyncThunk(
  "getBySearch",
  async (searchText, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      if (searchText.query === "s") {
        const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/search.php?s=${searchText.text}`
        );
        return response.data.meals;
      } else {
        const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/filter.php?${searchText.query}=${searchText.text}`
        );
        return response.data.meals;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get recipe by id
export const getById = createAsyncThunk("getById", async (id, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;

  try {
    const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}
    `);
    const recipe = response.data.meals[0];
    dispatch(getSimilarByCategory(recipe.strCategory));
    return recipe;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// get data from localStorage
export const getFromLocalStorage = createAsyncThunk(
  "getFromLocalStorage",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const dataLocal = await JSON.parse(localStorage.getItem("recipes"));

      return dataLocal !== null ? dataLocal : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// add / remove to localStorage
export const toggleArticleLocalStorage = createAsyncThunk(
  "addToLocalStorage",
  async (data, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;
    try {
      // get localstorage data
      let local = JSON.parse(localStorage.getItem("recipes"));

      // check if local exist
      if (local) {
        // check recipe exists with id meal from argument
        const recipeAlreadyExistInLocal = local.some(
          (doc) => doc.idMeal === data.idMeal
        );

        // for delete recipe from localStorage
        // check if recipe exists in local storage data
        if (recipeAlreadyExistInLocal) {
          // get all recipes with deffirent id than id meal from argument
          const copyLocal = local.filter((doc) => doc.idMeal !== data.idMeal);

          // save again data in localStorage
          await localStorage.setItem("recipes", JSON.stringify(copyLocal));
          return copyLocal;
        } else {
          // for add recipe to localStorage

          // push data form argument
          local.push(data);

          // save it in localStorage
          await localStorage.setItem("recipes", JSON.stringify(local));
          return local;
        }
      } else {
        // if local no exist

        // insert data argument into localStorage
        await localStorage.setItem("recipes", JSON.stringify([data]));
        return [data];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get all area
export const getAllArea = createAsyncThunk(
  "getAllArea",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
      );
      return [...response.data.meals];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// slice recipe
const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    loading: false,
    category: [],
    error: null,
    articles: [],
    oneArticle: {},
    localState: [],
    area: [],
    similarRecipe: [],
    allArea: [],
  },
  extraReducers: {
    // get category
    [getByCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [getByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    [getByCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getBySearch
    [getBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [getBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    },
    [getBySearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getByID
    [getById.pending]: (state, action) => {
      state.loading = true;
    },
    [getById.fulfilled]: (state, action) => {
      state.loading = false;
      state.oneArticle = action.payload;
    },
    [getById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getFromLocalStorage
    [getFromLocalStorage.pending]: (state, action) => {
      state.loading = true;
    },
    [getFromLocalStorage.fulfilled]: (state, action) => {
      state.loading = false;
      state.localState = action.payload;
    },
    [getFromLocalStorage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // toggleArticleLocalStorage
    [toggleArticleLocalStorage.pending]: (state, action) => {
      state.loading = true;
    },
    [toggleArticleLocalStorage.fulfilled]: (state, action) => {
      state.loading = false;
      state.localState = action.payload;
    },
    [toggleArticleLocalStorage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getByArea
    [getByArea.pending]: (state, action) => {
      state.loading = true;
    },
    [getByArea.fulfilled]: (state, action) => {
      state.loading = false;
      state.area = action.payload;
    },
    [getByArea.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getSimilarByCategory
    [getSimilarByCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [getSimilarByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.similarRecipe = action.payload;
    },
    [getSimilarByCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // getAllArea
    [getAllArea.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllArea.fulfilled]: (state, action) => {
      state.loading = false;
      state.allArea = action.payload;
    },
    [getAllArea.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default recipeSlice.reducer;
