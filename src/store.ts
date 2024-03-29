import { configureStore } from '@reduxjs/toolkit';
import { Action, combineReducers } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import cookbookReducer from './components/cookbook/CookbookScene.reducer';
import userReducer from './components/authentication/Authentication.reducer';
import recipesReducer from './components/recipe/recipesSlice';
import sceneReducer from './components/scene/sceneSlice';
import addRecipeReducer from './components/recipe/dialog/addRecipeSlice';

const uiReducers = combineReducers({
  addrecipe: addRecipeReducer,
});

export const rootReducer = combineReducers({
  ui: uiReducers,
  cookbook: cookbookReducer,
  recipes: recipesReducer,
  userInfo: userReducer,
  scene: sceneReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
