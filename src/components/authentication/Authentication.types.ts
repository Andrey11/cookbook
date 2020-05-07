import { Url } from "url";
import { Cookbook } from "../cookbook/Cookbook.types";

export type AuthenticationFormField = {
  id: string;
  label: string;
  value: string;
  type: string;
  pattern?: string;
};

export type AuthenticationFormOptions = {
  email: string;
  password?: string;
};

export type AuthenticationFormAction = {
  id: string;
  label: string;
  primary: boolean;
  onClick: (history: any, options?: AuthenticationFormOptions) => void;
};

export interface AuthenticationFormState {
  formTitle: string;
  formFields: Array<AuthenticationFormField>;
  formActions: Array<AuthenticationFormAction>;
  shouldNavigate: boolean;
  navigateToUrl: string;
  errors: any;
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
  error?: string;
  id?: string;
  cookbooks?: Array<Cookbook>;
  cookbookId?: string;
  recipes?: Array<Cookbook>;
  isFirebaseInitialized: boolean | false;
}
