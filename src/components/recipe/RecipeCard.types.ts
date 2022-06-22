export interface Dictionary<T> {
    [key: string]: T;
}

export interface Recipe {
    id: string | '';
    name?: string;
    description?: string;
    imageUrl?: string;
    tags?: Array<string>;
    createdBy?: string;
}

export interface RecipeState {
    id: string;
    record: Recipe;
    loaded: boolean | false;
    loading: boolean | false;
}

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export interface RecipesState {
    records: Dictionary<RecipeState>;
    filters?: Array<string>;
}

export interface CreateRecipeState {
    name: string;
    imageUrl?: string;
    visible: boolean;
    created: boolean;
}
