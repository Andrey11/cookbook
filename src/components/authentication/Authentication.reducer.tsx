import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "./Authentication.types";

const initialState: AuthState = {
  loggedIn: false,
  isFirebaseInitialized: false
};

export const slice = createSlice({
  name: "AuthenticationSlice",
  initialState,
  reducers: {
    onFirebaseInitialized: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.user = action.payload.user;
      state.loggedIn = action.payload.loggedIn;
      state.cookbookId = action.payload.cookbookId;
      state.isFirebaseInitialized = action.payload.isFirebaseInitialized;
    },
    onLoginSuccess: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id || undefined;
      state.user = action.payload;
      state.loggedIn = true;
      state.cookbookId = action.payload.cookbookId || undefined; // "MVNzqtXaUq7HJq0PgOrn";
      state.error = "";
    },
    onLoginError: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.error = action.payload;
      state.cookbookId = "";
      state.id = undefined;
      state.user = undefined;
    },
    onLogoutSuccess: state => {
      state.loggedIn = false;
      state.cookbookId = "";
      state.id = undefined;
      state.user = undefined;
      state.error = "";
    },
    onLogoutError: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.cookbookId = "";
      state.id = undefined;
      state.user = undefined;
      state.error = action.payload;
    },
    onCreateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.user.username = action.payload.username;
      state.user.password = "";
      state.loggedIn = true;
      state.id = action.payload.id || undefined;
      state.cookbookId = action.payload.cookbookId || undefined; // "MVNzqtXaUq7HJq0PgOrn";
      state.error = "";
    },
    onCreateUserError: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.cookbookId = "";
      state.id = undefined;
      state.user = undefined;
      state.error = action.payload;
    }
  }
});

export const {
  onLoginSuccess,
  onLoginError,
  onLogoutError,
  onLogoutSuccess,
  onCreateUserSuccess,
  onCreateUserError,
  onFirebaseInitialized
} = slice.actions;

export default slice.reducer;
