export const isRecipeDefined = (state: any, recipeId: string) => {
    return (
        state.data &&
        state.data.recipes &&
        state.data.recipes &&
        state.data.recipes.records &&
        state.data.recipes.records[recipeId]
    );
};

export const isRecipeLoaded = (state: any, recipeId: string) => {
    return (
        isRecipeDefined(state, recipeId) &&
        state.data.recipes.records[recipeId].loaded
    );
};

export const getRecipeRecord = (state: any, recipeId: string) => {
    return isRecipeLoaded(state, recipeId)
        ? state.data.recipes.records[recipeId].record
        : null;
};

export const getRecipeTitle = (state: any, recipeId: string) => {
    const rec = getRecipeRecord(state, recipeId);
    return rec ? rec.name : 'no name';
};

export const isRecipeLoading = (state: any, recipeId: string) => {
    return (
        isRecipeDefined(state, recipeId) &&
        state.data.recipes.records[recipeId].loading
    );
};
