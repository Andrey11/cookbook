import { Url } from "url";
import { Cookbook } from "../cookbook/Cookbook.types";

export enum ErrorCode {
  EmailNotFound,
  EmailEmpty,
  EmailInvalid,
  PasswordNotFound,
  PasswordEmpty,
  PasswordInvalid,
  EmailPasswordEmpty
}

export interface FormError {
  errorMessage: string;
  errorCode?: string;
  fieldId?: string;
}

export type AuthenticationFormField = {
  id: string;
  label: string;
  value: string;
  type: string;
  pattern?: string;
  formError?: FormError;
};

export type FieldType = "email" | "password" | "title";

export type FormFieldState = {
  value: string;
  valid: boolean;
  fieldType: FieldType;
};

export type AuthenticationFormAction = {
  id: string;
  label: string;
  primary: boolean;
  onClick: (history: any, options: Array<FormFieldState>) => void;
};

export interface AuthenticationFormState {
  formTitle: string;
  formFields: Array<AuthenticationFormField>;
  formActions: Array<AuthenticationFormAction>;
  shouldNavigate: boolean;
  navigateToUrl: string;
  errors: string;
  formErrors?: boolean;
  clearError: () => void;
}

export interface User {
  id: string | null;
  username: string;
  password: string | ""; // TODO: remove me
  avatarUrl: Url | null; // TODO: Add a default image url
  cookbooks: Array<Cookbook> | [];
  cookbookId: string | null;
  recipes: Array<Cookbook> | [];
  loggedIn: boolean;
}

export interface AuthState {
  user?: User;
  loggedIn: boolean | false;
  avatarUrl?: Url;
  error?: string; // TODO: deprecate in favor of formErrors
  id?: string;
  cookbooks?: Array<Cookbook>;
  cookbookId?: string;
  recipes?: Array<Cookbook>;
  isFirebaseInitialized: boolean | false;
  formErrors?: Array<FormError>;
}
