import { Recipe, RecipeState } from "../recipe/RecipeCard.types";

export interface Cookbook {
  id: string | null;
  name: string;
  recipes: Array<Recipe>;
}

export interface CookbookState {
  record?: Cookbook | null;
  recipeIds?: Array<RecipeState> | null;
  cookbookId?: string | null;
  filters?: Array<string>;
  error?: string | null;
  loading: boolean;
  loaded: boolean;
}
