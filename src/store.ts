import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import data from "./components/cookbook/CookbookScene.reducer";
import userDataReducer from "components/authentication/Authentication.reducer";
import userInterfaceReducer from "./reducers/UserInterface.reducer";

export const rootReducer = combineReducers({
  data,
  userInfo: userDataReducer,
  ui: userInterfaceReducer
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
