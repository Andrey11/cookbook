export const hasRecord = (state: any) => {
    return state.cookbook && state.cookbook.record;
};

export const recipesList = (state: any) => {
    return hasRecord(state) ? state.cookbook.record.recipes : undefined;
};

export const allRecipesList = (state: any) => {
    return state.recipes.records;
};

export const shouldReloadAllRecipesList = (state: any) => {
    return Object.keys(state.recipes.records).length === 0;
};

export const isFirebaseInitialized = (state: any) => {
    return state.userInfo.isFirebaseInitialized;
};

export const shouldLogout = (state: any) => {
    return (
        isFirebaseInitialized(state) &&
        state.userInfo.loggedIn === false &&
        !state.cookbook.cookbookId
    );
};

export const getCookbookId = (state: any) => {
    return (
        state.cookbook.cookbookId ||
        (state.userInfo.user ? state.userInfo.user.cookbookId : null)
    );
};

export const shouldLoadCookbook = (state: any) => {
    return !state.cookbook.loaded && !state.cookbook.loading;
};

export const isLoaded = (state: any) => state.cookbook.loaded;

export const isLoading = (state: any) => state.cookbook.loading;
