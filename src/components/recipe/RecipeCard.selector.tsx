import { RootState } from '../../store';

export const isRecipeDefined = (
    state: RootState,
    recipeId: string
): boolean => {
    return (
        state.recipes &&
        state.recipes.records &&
        state.recipes.records[recipeId] &&
        !!state.recipes.records[recipeId].record
    );
};

export const isRecipeLoaded = (state: RootState, recipeId: string): boolean => {
    return (
        isRecipeDefined(state, recipeId) &&
        state.recipes.records[recipeId].loaded
    );
};

export const getRecipeRecord = (state: RootState, recipeId: string) => {
    return isRecipeLoaded(state, recipeId)
        ? state.recipes.records[recipeId].record
        : null;
};

export const getRecipeUrl = (state: RootState, recipeId: string): string => {
    return isRecipeLoaded(state, recipeId)
        ? state.recipes.records[recipeId].record.imageUrl ||
              'url(/images/mb-bg-fb-16.png)'
        : '';
};

export const getRecipeTitle = (state: RootState, recipeId: string): string => {
    const rec = getRecipeRecord(state, recipeId);
    return rec ? rec.name || 'no name' : 'no name';
};

export const getRecipeCreatedBy = (
    state: RootState,
    recipeId: string
): string => {
    const rec = getRecipeRecord(state, recipeId);
    return rec ? rec.createdBy || 'unknown' : 'unknown';
};

export const isRecipeLoading = (
    state: RootState,
    recipeId: string
): boolean => {
    return (
        isRecipeDefined(state, recipeId) &&
        state.recipes.records[recipeId].loading
    );
};
