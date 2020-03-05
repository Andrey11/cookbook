import { Recipe } from "../recipe/RecipeCard.types";

export interface Cookbook {
  id: string | null;
  name: string;
  recipes: Array<Recipe>;
}


