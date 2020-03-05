export interface Recipe {
  id: string;
  name: string;
}

export interface Cookbook {
  id: string | null;
  name: string;
  recipes: Array<Recipe>;
}
