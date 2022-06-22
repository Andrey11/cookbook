import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cookbook, CookbookState } from './Cookbook.types';
import { Recipe } from '../recipe/RecipeCard.types';

export const cookbookSlice = createSlice({
    name: 'cookbook',
    initialState: {
        record: null,
        cookbookId: '',
        error: null,
        filters: [],
        loading: false,
        loaded: false,
    } as CookbookState,
    reducers: {
        onLoadCookbook: (
            state: CookbookState,
            action: PayloadAction<string>
        ) => {
            state.loading = true;
            state.loaded = false;
            state.record = null;
            state.error = null;
            state.cookbookId = action.payload;
        },
        onLoadCookbookSuccess: (
            state: CookbookState,
            action: PayloadAction<Cookbook>
        ) => {
            state.loading = false;
            state.record = action.payload;
            state.cookbookId = action.payload.id;
            state.loaded = true;
        },
        onLoadCookbookError: (
            state: CookbookState,
            action: PayloadAction<string>
        ) => {
            state.loading = false;
            state.record = null;
            state.error = action.payload;
            state.loaded = false;
        },
        resetCookbook: (state: CookbookState) => {
            state.loaded = false;
            state.loading = false;
            state.record = null;
            state.error = null;
            state.cookbookId = null;
        },
        onAddRecipeSuccess: (
            state: CookbookState,
            action: PayloadAction<Recipe>
        ) => {
            state.record?.recipes.push(action.payload);
        },
    },
});

export const {
    onLoadCookbook,
    onLoadCookbookSuccess,
    onLoadCookbookError,
    resetCookbook,
    onAddRecipeSuccess,
} = cookbookSlice.actions;

export default cookbookSlice.reducer;
