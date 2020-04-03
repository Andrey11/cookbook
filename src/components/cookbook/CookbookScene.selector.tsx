export const hasRecord = (state: any) => {
  return state.data && state.data.cookbook && state.data.cookbook.record;
};

export const recipesList = (state: any) => {
  return hasRecord(state) ? state.data.cookbook.record.recipes : undefined;
};
