import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    Slice,
} from '@reduxjs/toolkit';
import {
    getAvatar,
    loadUserData,
    setAvatar,
    updateUserData,
} from '../user/AccountApi';
import { RootState } from '../../store';
import { User, AuthState, UserData } from './Authentication.types';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

const initialState: AuthState = {
    loggedIn: false,
    userInfoLoaded: false,
    status: 'idle',
    isFirebaseInitialized: false,
    authVerfied: false,
    avatarUrl: '',
    avatarName: '',
    nickname: '',
    firstname: '',
    lastname: '',
};

export const updateUserDataAsync = createAsyncThunk(
    'authentication/updateUserData',
    async (userData: any) => {
        await updateUserData(userData.userId, userData);
        // The value we return becomes the `fulfilled` action payload
        return userData;
    },
);
export const loadUserDataAsync = createAsyncThunk(
    'authentication/loadUserData',
    async (userId: string) => {
        const response: DocumentSnapshot<DocumentData> = await loadUserData(userId);
        const dataProps: any = response.data();
        const userData: UserData = {
            nickname: dataProps.nickname,
            firstname: dataProps.firstname,
            lastname: dataProps.lastname,
            avatarName: dataProps.avatarName,
            avatarUrl: '',
        };
        // The value we return becomes the `fulfilled` action payload
        return userData;
    },
);
export const loadUserAvatarAsync = createAsyncThunk(
    'authentication/loadUserAvatar',
    async (avatarPath: string) => {
        const avatarUrl = await getAvatar(avatarPath);
        return avatarUrl;
    },
);

export const uploadUserAvatarAsync = createAsyncThunk(
    'authentication/uploadUserAvatar',
    async (uploadData: any) => {
        const avatarName = await setAvatar(uploadData.userId, uploadData.file);
        return avatarName;
    },
);

export const authSlice: Slice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        onFirebaseInitialized: (
            state: AuthState,
            action: PayloadAction<AuthState>,
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
            state.userInfoLoaded = false;
            state.cookbookId = '';
            state.id = undefined;
            state.user = undefined;
            state.error = '';
            state.nickname = '';
            state.firstname = '';
            state.lastname = '';
            state.avatarName = '';
            state.avatarUrl = '';
            state.userInfoLoaded = false;
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
            action: PayloadAction<User>,
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
            action: PayloadAction<string>,
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
    extraReducers: (builder) => {
        builder
            .addCase(updateUserDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const userData: UserData = action.payload;
                state.firstname = userData.firstname;
                state.lastname = userData.lastname;
                state.nickname = userData.nickname;
                state.avatarName = userData.avatarName;
            })
            .addCase(loadUserDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUserDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const userData: UserData = action.payload;
                state.firstname = userData.firstname;
                state.lastname = userData.lastname;
                state.nickname = userData.nickname;
                state.avatarName = userData.avatarName;
                state.userInfoLoaded = true;
            })
            .addCase(loadUserAvatarAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUserAvatarAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.avatarUrl = action.payload;
            })
            .addCase(uploadUserAvatarAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadUserAvatarAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.avatarName = action.payload;
            });
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

export const firebaseInitialized = (state: RootState): boolean => state.userInfo.isFirebaseInitialized;

export const authVerified = (state: RootState): boolean => state.userInfo.authVerfied;

export const userCookbookId = (state: RootState): string => state.userInfo.user?.cookbookId || '';

export const isUserLoggedIn = (state: RootState): boolean => state.userInfo.loggedIn;
export const isUserInfoLoaded = (state: RootState): boolean => state.userInfo.userInfoLoaded;

export const isError = (state: RootState): boolean => state.userInfo.error && state.userInfo.error.code.length > 0;

export const getUserId = (state: RootState): string => state.userInfo.user?.id;
export const getUserEmail = (state: RootState): string => state.userInfo.user?.username || '';
export const getUserNickname = (state: RootState): string => state.userInfo.nickname || '';
export const getUserFirstname = (state: RootState): string => state.userInfo.firstname || '';
export const getUserLastname = (state: RootState): string => state.userInfo.lastname || '';
export const getAvatarUrl = (state: RootState): string => state.userInfo.avatarUrl || '';
export const getAvatarName = (state: RootState): string => state.userInfo.avatarName || '';
export const getUserData = (state: RootState): UserData => ({
    nickname: getUserNickname(state),
    lastname: getUserLastname(state),
    firstname: getUserFirstname(state),
    avatarName: getAvatarName(state),
    avatarUrl: getAvatarUrl(state),
});

export const getStatus = (state: RootState): string => state.userInfo.status;

export default authSlice.reducer;
