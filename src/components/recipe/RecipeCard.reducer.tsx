import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  recipeId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  recipeId: null,
  loading: false,
  loaded: false,
  error: null
};

export const slice = createSlice({
  name: "RecipeCard",
  initialState,
  reducers: {
    onChanges: state => {
      state.loading = true;
      state.recipeId;
    },
    onLoadRecipeData: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.loaded = false;
      state.recipeId = action.payload;
    },
    onLoadRecipeDataSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.loaded = true;
      state.recipeId = action.payload;
    }
  }
});

export const { onChanges } = slice.actions;

export default slice.reducer;
