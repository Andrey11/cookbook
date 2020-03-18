import { Url } from "url";
import { Cookbook } from "../cookbook/Cookbook.types";

export interface User {
  id: string | null;
  username: string | "";
  password: string | ""; // TODO: remove me
  avatarUrl: Url | null; // TODO: Add a default image url
  cookbooks: Array<Cookbook> | [];
  cookbookId: string | null;
  recipes: Array<Cookbook> | [];
  loggedIn: boolean;
}