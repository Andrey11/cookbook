import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorCode } from "components/authentication/Authentication.types";

interface ErrorState {
  errorMessage?: string;
  hasError?: boolean;
  code?: ErrorCode;
}

interface FieldState {
  value?: string;
  label?: string;
  error?: ErrorState;
}

interface LoginFormState {
  email?: FieldState;
  password?: FieldState;
  error?: ErrorState;
}

interface CreateAccountFormState {
  email?: FieldState;
  password?: FieldState;
  error?: ErrorState;
}

interface ResetPasswordFormState {
  email?: FieldState;
  error?: ErrorState;
}

export interface FormState {
  loginForm: LoginFormState;
  createAccountForm: CreateAccountFormState;
  resetPasswordForm?: ResetPasswordFormState; // TODO: Remove optional state
}

const initialState: FormState = {
  loginForm: {
    error: {
      hasError: false,
      errorMessage: "None"
    }
  },
  createAccountForm: {
    error: {
      hasError: false,
      errorMessage: "None"
    }
  }
};

export const slice = createSlice({
  name: "UserInterfaceSlice",
  initialState,
  reducers: {
    onFormUpdate: (state, action: PayloadAction<any>) => {
      state;
    },
    onLoginFormUpdate: (state, action: PayloadAction<ErrorState>) => {
      state.loginForm.error = action.payload;
    },
    onCreateUserFormUpdate: (state, action: PayloadAction<ErrorState>) => {
      state.createAccountForm.error = action.payload;
    }
    // onLoginFormUpdate: (state, action: PayloadAction<any>) => {
    //   state.loginForm = {
    //     email: action.payload.email,
    //     password: action.payload.password
    //   };
    //   state.createAccountForm = {};
    //   state.resetPasswordForm = {};
    // }
    // onFirebaseInitialized: (state, action: PayloadAction<AuthState>) => {
    //   state.id = action.payload.id;
    //   state.user = action.payload.user;
    //   state.loggedIn = action.payload.loggedIn;
    //   state.cookbookId = action.payload.cookbookId;
    //   state.isFirebaseInitialized = action.payload.isFirebaseInitialized;
    // },
    // onLoginSuccess: (state, action: PayloadAction<User>) => {
    //   state.id = action.payload.id || undefined;
    //   state.user = action.payload;
    //   state.loggedIn = true;
    //   state.cookbookId = action.payload.cookbookId || undefined; // "MVNzqtXaUq7HJq0PgOrn";
    //   state.error = "";
    // },
    // onLoginError: (state, action: PayloadAction<string>) => {
    //   state.loggedIn = false;
    //   state.error = action.payload;
    //   state.cookbookId = "";
    //   state.id = undefined;
    //   state.user = undefined;
    // },
    // onLogoutSuccess: state => {
    //   state.loggedIn = false;
    //   state.cookbookId = "";
    //   state.id = undefined;
    //   state.user = undefined;
    //   state.error = "";
    // },
    // onLogoutError: (state, action: PayloadAction<string>) => {
    //   state.loggedIn = false;
    //   state.cookbookId = "";
    //   state.id = undefined;
    //   state.user = undefined;
    //   state.error = action.payload;
    // },
    // onClearError: state => {
    //   state.error = "";
    // },
    // onCreateUserSuccess: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload;
    //   state.user.username = action.payload.username;
    //   state.user.password = "";
    //   state.loggedIn = true;
    //   state.id = action.payload.id || undefined;
    //   state.cookbookId = action.payload.cookbookId || undefined;
    //   state.error = "";
    // },
    // onCreateUserError: (state, action: PayloadAction<string>) => {
    //   state.loggedIn = false;
    //   state.cookbookId = "";
    //   state.id = undefined;
    //   state.user = undefined;
    //   state.error = action.payload;
    // }
  }
});

export const {
  onFormUpdate,
  onCreateUserFormUpdate,
  onLoginFormUpdate
} = slice.actions;

export default slice.reducer;
