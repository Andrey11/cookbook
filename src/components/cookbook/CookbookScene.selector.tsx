export const hasRecord = (state: any) => {
    return state.data && state.data.cookbook && state.data.cookbook.record;
};

export const recipesList = (state: any) => {
    return hasRecord(state) ? state.data.cookbook.record.recipes : undefined;
};

export const allRecipesList = (state: any) => {
    return state.data.recipes.records;
};

export const shouldReloadAllRecipesList = (state: any) => {
    return Object.keys(state.data.recipes.records).length === 0;
};

export const isFirebaseInitialized = (state: any) => {
    return state.userInfo.isFirebaseInitialized;
};

export const shouldLogout = (state: any) => {
    return (
        isFirebaseInitialized(state) &&
        state.userInfo.loggedIn === false &&
        !state.data.cookbook.cookbookId
    );
};

export const getCookbookId = (state: any) => {
    return (
        state.data.cookbook.cookbookId ||
        (state.userInfo.user ? state.userInfo.user.cookbookId : null)
    );
};

export const shouldLoadCookbook = (state: any) => {
    return !state.data.cookbook.loaded && !state.data.cookbook.loading;
};
