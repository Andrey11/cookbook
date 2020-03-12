import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./Authentication.types";

const initialState: any = {
  user: null,
  loggedIn: false,
  avatarUrl: null,
  id: null,
  cookbooks: [],
  cookbookId: null,
  recipes: []
};

export const slice = createSlice({
  name: "AuthenticationSlice",
  initialState,
  reducers: {
    onLoginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.loggedIn = true;
      state.id = action.payload.id;
      state.cookbookId = action.payload.cookbookId; // "MVNzqtXaUq7HJq0PgOrn";
      state.error = "";
    },
    onLoginError: (state, action: PayloadAction<string>) => {
      state.username = "";
      state.password = "";
      state.loggedIn = false;
      state.error = action.payload;
      state.cookbookId = "";
      state.id = null;
      state.user = null;
    },
    onLogoutSuccess: state => {
      state.username = "";
      state.password = "";
      state.loggedIn = false;
      state.cookbookId = "";
      state.id = null;
      state.user = null;
      state.error = "";
    },
    onLogoutError: (state, action: PayloadAction<string>) => {
      state.username = "";
      state.password = "";
      state.loggedIn = false;
      state.cookbookId = "";
      state.id = null;
      state.user = null;
      state.error = action.payload;
    }
  }
});

export const {
  onLoginSuccess,
  onLoginError,
  onLogoutError,
  onLogoutSuccess
} = slice.actions;

export default slice.reducer;
