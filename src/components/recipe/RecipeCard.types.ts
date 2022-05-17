import { Url } from 'url';

export interface Recipe {
    id: string | '';
    name?: string;
    description?: string;
    imageUrl?: Url;
    tags?: Array<string>;
}

export interface RecipeState {
    id: string;
    record?: Recipe;
    loaded?: boolean | false;
    loading?: boolean | false;
}

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export interface RecipesState {
    records: Partial<RecipeState>;
    filters?: Array<string>;
    test: Partial<Recipe>;
}

export interface CreateRecipeState {
    name: string;
    imageUrl?: Url;
    visible: boolean;
    created: boolean;
}
