import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export interface AddRecipeState {
    name: string;
    imageUrl: string;
    created: boolean;
    visible: boolean;
}

const initialState: AddRecipeState = {
    name: '',
    imageUrl: '',
    created: false,
    visible: false
};

export const addRecipeSlice = createSlice({
    name: 'addrecipe',
    initialState,
    reducers: {
        setRecipeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setRecipeImage: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload;
        },
        setRecipeCreated: (state, action: PayloadAction<boolean>) => {
            state.created = action.payload;
            state.visible = false;
        },
        setRecipeDialogVisible: (
            state: AddRecipeState, 
            action: PayloadAction<boolean>
        ) => {
            state.name = initialState.name;
            state.imageUrl = initialState.imageUrl;
            state.visible = action.payload;
        }
    },
});

export const { 
    setRecipeName, 
    setRecipeImage, 
    setRecipeCreated, 
    setRecipeDialogVisible 
} = addRecipeSlice.actions;

// The function below is called a selector and allows us to select
// a selected tab from the state.
export const getRecipeName = (state: RootState): string =>
    state.ui.addrecipe.name;
export const getRecipeImage = (state: RootState): string =>
    state.ui.addrecipe.imageUrl;
export const isRecipeCreated = (state: RootState): boolean =>
    state.ui.addrecipe.created;        
export const isRecipeDialogVisible = (state: RootState): boolean =>
    state.ui.addrecipe.visible;

export default addRecipeSlice.reducer;
