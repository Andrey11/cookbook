import { Url } from "url";

export interface Recipe {
  id: string | "";
  name?: string;
  description?: string;
  imageUrl?: Url;
  tags?: Array<string>;
}

export interface RecipeState {
  id: Recipe["id"];
  record?: Recipe;
  loaded: boolean;
  loading: boolean;
}

export type Partial<T> = {
  [P in keyof T]?: T[P];
}

export interface RecipesState {
  records?: Array<Recipe>;
  uiRecords?: Array<RecipeState>;
  filters?: Array<string>;
  test: Partial<Recipe>; 
}
