import { Url } from "url";
import { Cookbook } from "../recipe/RecipeCard.types";

export interface User {
  id: string | null;
  username: string | "";
  password: string | "";
  avatarUrl: Url | null; // TODO: Add a default image url
  cookbooks: Array<Cookbook> | [];
  cookbookId: string | null;
  recipes: Array<Cookbook> | [];
  loggedIn: boolean;
}