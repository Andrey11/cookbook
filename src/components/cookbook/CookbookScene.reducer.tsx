import { PayloadAction, createSlice, combineReducers } from '@reduxjs/toolkit';
import { Cookbook, CookbookState } from './Cookbook.types';
import {
    RecipesState,
    RecipeState,
    CreateRecipeState,
    Recipe,
} from 'components/recipe/RecipeCard.types';
import { Url } from 'url';

export const cookbookSlice = createSlice({
    name: 'CookbookScene',
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

export const recipesSlice = createSlice({
    name: 'Recipes',
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

export const createRecipeSlice = createSlice({
    name: 'CreateRecipe',
    initialState: {
        name: '',
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
            state.name = '';
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
