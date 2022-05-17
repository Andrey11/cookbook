import { configureStore } from '@reduxjs/toolkit';
import { Action, combineReducers } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import data from './components/cookbook/CookbookScene.reducer';
import userReducer from 'components/authentication/Authentication.reducer';
import sceneReducer from 'components/scene/sceneSlice';

export const rootReducer = combineReducers({
    data,
    userInfo: userReducer,
    scene: sceneReducer,
});

const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;
