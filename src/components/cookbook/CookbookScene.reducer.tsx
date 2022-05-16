import { PayloadAction, createSlice, combineReducers } from "@reduxjs/toolkit";
import { Cookbook, CookbookState } from "./Cookbook.types";
import {
  RecipesState,
  RecipeState,
  CreateRecipeState,
} from "components/recipe/RecipeCard.types";
import { Url } from "url";

export const cookbookSlice = createSlice({
  name: "CookbookScene",
  initialState: {
    record: null,
    cookbookId: "",
    error: null,
    filters: [],
    loading: false,
    loaded: false,
  } as CookbookState,
  reducers: {
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
      state.record = null;
      state.error = action.payload;
      state.loaded = false;
    },
    resetCookbook: (state: any) => {
      state.loaded = false;
      state.loading = false;
      state.record = null;
      state.error = null;
      state.cookbookId = null;
    },
  },
});

export const {
  onLoadCookbook,
  onLoadCookbookSuccess,
  onLoadCookbookError,
  resetCookbook,
} = cookbookSlice.actions;

export const recipesSlice = createSlice({
  name: "Recipes",
  initialState: {
    records: {},
    uiRecords: [],
    filters: [],
    test: {},
  } as RecipesState,
  reducers: {
    onBeginLoadRecipe: (
      state: RecipesState,
      action: PayloadAction<RecipeState>
    ) => {
      state.records = {
        ...state.records,
        [action.payload.id]: action.payload,
      };
      state.test = {
        ...state.test,
        [action.payload.id]: action.payload,
      };
    },
    onLoadRecipeSuccess: (
      state: RecipesState,
      action: PayloadAction<RecipeState>
    ) => {
      state.records = {
        ...state.records,
        [action.payload.id]: action.payload,
      };
      state.test = {
        ...state.test,
        [action.payload.id]: action.payload,
      };
    },
    onLoadAllRecipesSuccess: (
      state: RecipesState,
      action: PayloadAction<RecipesState>
    ) => {
      state.records = action.payload.records;
      state.filters = action.payload.filters;
      state.test = action.payload.test;
    },
    resetRecipes: (state: RecipesState) => {
      (state.records = {}), (state.filters = []), (state.test = {});
    },
  },
});

export const {
  onBeginLoadRecipe,
  onLoadRecipeSuccess,
  onLoadAllRecipesSuccess,
  resetRecipes,
} = recipesSlice.actions;

export const createRecipeSlice = createSlice({
  name: "CreateRecipe",
  initialState: {
    name: "",
    created: false,
  } as CreateRecipeState,
  reducers: {
    onBeginCreateRecipe: (state: CreateRecipeState) => {
      state.visible = true;
    },
    onCreateRecipeNameChange: (
      state: CreateRecipeState,
      action: PayloadAction<string>
    ) => {
      state.name = action.payload;
    },
    onCreateRecipeImageUrlChange: (
      state: CreateRecipeState,
      action: PayloadAction<Url>
    ) => {
      state.imageUrl = action.payload;
    },
    onCreateRecipeAction: (state: CreateRecipeState) => {
      state.created = true;
      state.visible = false;
    },
    onEndCreateRecipe: (state: CreateRecipeState) => {
      state.name = "";
      state.imageUrl = undefined;
      state.visible = false;
      state.created = false;
    },
  },
});

export const {
  onBeginCreateRecipe,
  onCreateRecipeNameChange,
  onCreateRecipeImageUrlChange,
  onCreateRecipeAction,
  onEndCreateRecipe,
} = createRecipeSlice.actions;

export default combineReducers({
  cookbook: cookbookSlice.reducer,
  recipes: recipesSlice.reducer,
  createrecipe: createRecipeSlice.reducer,
});
