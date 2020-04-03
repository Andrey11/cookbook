import { PayloadAction, createSlice, combineReducers } from "@reduxjs/toolkit";
import { Cookbook, CookbookState } from "./Cookbook.types";
import { RecipesState, Recipe } from "components/recipe/RecipeCard.types";

export const cookbookSlice = createSlice({
  name: "CookbookScene",
  initialState: {
    record: null,
    cookbookId: "",
    error: null,
    filters: [],
    detailCardList: [],
    loading: false,
    loaded: false
  } as CookbookState,
  reducers: {
    beginLoadCardList: (
      state: CookbookState,
      action: PayloadAction<string>
    ) => {
      state.loading = true;
      state.loaded = false;
      state.cookbookId = action.payload;
    },
    onCardListLoaded: (state, action: PayloadAction<Array<any>>) => {
      state.cardList = action.payload;
      state.loading = false;
      state.loaded = true;
    },
    onCardListLoadError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    onLoadCookbook: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.loaded = false;
      state.record = null;
      state.error = null;
      state.cookbookId = action.payload;
    },
    onLoadCookbookSuccess: (state, action: PayloadAction<Cookbook>) => {
      state.loading = false;
      state.record = action.payload;
      state.cookbookId = action.payload.id;
      state.loaded = true;
    },
    onLoadCookbookError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.cardList = [];
      state.record = null;
      state.error = action.payload;
      state.loaded = true;
    },
    resetCookbook: state => {
      state.loaded = false;
      state.loading = false;
      state.record = null;
      state.error = null;
      state.cookbookId = null;
    }
  }
});

export const {
  beginLoadCardList,
  onCardListLoaded,
  onCardListLoadError,
  onLoadCookbook,
  onLoadCookbookSuccess,
  onLoadCookbookError,
  resetCookbook
} = cookbookSlice.actions;

export const recipesSlice = createSlice({
  name: "Recipes",
  initialState: {
    records: [],
    uiRecords: [],
    filters: [],
    test: {}
  } as RecipesState,
  reducers: {
    onBeginLoadRecipe: (state: RecipesState, action: PayloadAction<Recipe>) => {
      state.test = {
        ...state.test,
        [action.payload.id]: action.payload
      };
    },
    onLoadRecipe: (state: RecipesState, action: PayloadAction<Recipe>) => {
      state.records?.push(action.payload);
      state.test = {
        ...state.test,
        [action.payload.id]: action.payload
      };
    }
  }
});

export const { onBeginLoadRecipe, onLoadRecipe } = recipesSlice.actions;

export default combineReducers({
  cookbook: cookbookSlice.reducer,
  recipes: recipesSlice.reducer
});
