import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import counterReducer from "./features/counter/CounterSlice";
import cookbookReducer from "./components/recipe/RecipeCardSceneSlice";
import recipeDetailReducer from "components/recipe/RecipeCard.reducer";

export const rootReducer = combineReducers({
  counter: counterReducer,
  cookbook: cookbookReducer,
  recipeDetails: recipeDetailReducer
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
