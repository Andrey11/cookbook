import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  recipeId: number;
  loading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  recipeId: -1,
  loading: false,
  error: null
};

export const slice = createSlice({
  name: "RecipeCard",
  initialState,
  reducers: {
    onChanges: state => {
      state.loading = true;
      state.recipeId = state.recipeId;
    }
  }
});

export const { onChanges } = slice.actions;

export default slice.reducer;
