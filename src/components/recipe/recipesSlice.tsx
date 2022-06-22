import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    RecipesState,
    RecipeState
} from './RecipeCard.types';

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        records: {},
        uiRecords: [],
        filters: [],
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
        },
        onLoadRecipeSuccess: (
            state: RecipesState,
            action: PayloadAction<RecipeState>
        ) => {
            state.records = {
                ...state.records,
                [action.payload.id]: action.payload,
            };
        },
        onLoadAllRecipesSuccess: (
            state: RecipesState,
            action: PayloadAction<RecipesState>
        ) => {
            state.records = action.payload.records;
            state.filters = action.payload.filters;
        },
        resetRecipes: (state: RecipesState) => {
            (state.records = {}), (state.filters = []);
        },
    },
});

export const {
    onBeginLoadRecipe,
    onLoadRecipeSuccess,
    onLoadAllRecipesSuccess,
    resetRecipes,
} = recipesSlice.actions;


export default recipesSlice.reducer;
