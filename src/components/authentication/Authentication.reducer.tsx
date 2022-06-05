import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { User, AuthState } from './Authentication.types';

const initialState: AuthState = {
    loggedIn: false,
    isFirebaseInitialized: false,
    authVerfied: false,
};

export const authSlice: Slice = createSlice({
    name: 'AuthenticationSlice',
    initialState,
    reducers: {
        onFirebaseInitialized: (
            state: AuthState,
            action: PayloadAction<AuthState>
        ) => {
            state.id = action.payload.id;
            state.user = action.payload.user;
            state.loggedIn = action.payload.loggedIn;
            state.cookbookId = action.payload.cookbookId;
            state.isFirebaseInitialized = action.payload.isFirebaseInitialized;
            state.authVerfied = action.payload.authVerfied;
        },
        onLoginSuccess: (state: AuthState, action: PayloadAction<User>) => {
            state.id = action.payload.id || undefined;
            state.user = action.payload;
            state.loggedIn = true;
            state.cookbookId = action.payload.cookbookId || undefined; // "MVNzqtXaUq7HJq0PgOrn";
            state.error = '';
        },
        onLoginError: (state: AuthState, action: PayloadAction<string>) => {
            state.loggedIn = false;
            state.error = action.payload;
            state.cookbookId = '';
            state.id = undefined;
            state.user = undefined;
        },
        onLogoutSuccess: (state: AuthState) => {
            state.loggedIn = false;
            state.cookbookId = '';
            state.id = undefined;
            state.user = undefined;
            state.error = '';
        },
        onLogoutError: (state: AuthState, action: PayloadAction<string>) => {
            state.loggedIn = false;
            state.cookbookId = '';
            state.id = undefined;
            state.user = undefined;
            state.error = action.payload;
        },
        onCreateUserSuccess: (
            state: AuthState,
            action: PayloadAction<User>
        ) => {
            state.user = action.payload;
            state.user.username = action.payload.username;
            state.user.password = '';
            state.loggedIn = true;
            state.id = action.payload.id || undefined;
            state.cookbookId = action.payload.cookbookId || undefined;
            state.error = '';
        },
        onCreateUserError: (
            state: AuthState,
            action: PayloadAction<string>
        ) => {
            state.loggedIn = false;
            state.cookbookId = '';
            state.id = undefined;
            state.user = undefined;
            state.error = action.payload;
        },
        onPasswordResetSuccess: (state: AuthState) => {
            state.cookbookId = '';
            state.loggedIn = false;
        },
    },
});

export const {
    onLoginSuccess,
    onLoginError,
    onLogoutError,
    onLogoutSuccess,
    onCreateUserSuccess,
    onCreateUserError,
    onFirebaseInitialized,
    onPasswordResetSuccess,
} = authSlice.actions;

export const firebaseInitialized = (state: RootState): boolean =>
    state.userInfo.isFirebaseInitialized;

export const authVerified = (state: RootState): boolean =>
    state.userInfo.authVerfied;

export const userCookbookId = (state: RootState): string =>
    state.userInfo.user?.cookbookId || '';

export const isUserLoggedIn = (state: RootState): boolean =>
    state.userInfo.loggedIn;

export const isError = (state: RootState): boolean =>
    state.userInfo.error && state.userInfo.error.code.length > 0;

export default authSlice.reducer;
