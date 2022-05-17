import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
// import { Dictionary, SceneItem, SceneType } from "./Scene.types";
// import * as SceneHelper from "./Scene.helpers";

export interface SceneState {
    sceneName: string;
}

const initialState: SceneState = {
    sceneName: 'DefaultScene',
};

export const sceneSlice = createSlice({
    name: 'scene',
    initialState,
    reducers: {
        setActiveScene: (state, action: PayloadAction<string>) => {
            state.sceneName = action.payload;
        },
    },
});

export const { setActiveScene } = sceneSlice.actions;

// The function below is called a selector and allows us to select
// a selected tab from the state.
export const getActiveScene = (state: RootState): string =>
    state.scene.sceneName;
export const firebaseInitialized = (state: RootState): boolean =>
    state.userInfo.isFirebaseInitialized;

export default sceneSlice.reducer;
