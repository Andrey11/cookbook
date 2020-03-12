import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cookbook } from "./Cookbook.types";

interface InitialState {
  record: Cookbook | null;
  cardList: Array<any>;
  cookbookId: string | null;
  loading: boolean;
  error: string | null;
  filters: Array<string>;
  detailCardList: Array<any>;
  loaded: boolean;
}

export const initialState: InitialState = {
  record: null,
  cardList: [],
  cookbookId: "",
  error: null,
  filters: [],
  detailCardList: [],
  loading: false,
  loaded: false
};

export const slice = createSlice({
  name: "CookbookScene",
  initialState,
  reducers: {
    loadCardList: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cookbookId = action.payload;
    },
    onCardListLoaded: (state, action: PayloadAction<Array<any>>) => {
      state.cardList = action.payload;
      state.loading = false;
      state.loaded = true;
    },
    onCardListLoadError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    onLoadCookbook: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.loaded = false;
      state.record = null;
      state.error = null;
      state.cookbookId = action.payload;
    },
    onLoadCookbookSuccess: (state, action: PayloadAction<Cookbook>) => {
      state.loading = false;
      state.record = action.payload;
      state.cookbookId = action.payload.id;
      state.loaded = true;
    },
    onLoadCookbookError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.cardList = [];
      state.record = null;
      state.error = action.payload;
      state.loaded = true;
    }
  }
});

export const {
  loadCardList,
  onCardListLoaded,
  onCardListLoadError,
  onLoadCookbook,
  onLoadCookbookSuccess,
  onLoadCookbookError
} = slice.actions;

export default slice.reducer;
