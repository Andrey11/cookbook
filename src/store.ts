import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import data from "./components/cookbook/CookbookScene.reducer";
import userReducer from "components/authentication/Authentication.reducer";
import counterReducer from "./features/counter/CounterSlice"; // TODO: Remove me

export const rootReducer = combineReducers({
  data,
  counter: counterReducer,
  userInfo: userReducer
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
