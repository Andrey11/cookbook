import { Url } from "url";
import { Cookbook } from "../cookbook/Cookbook.types";

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
