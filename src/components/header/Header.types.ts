export enum HEADER_TYPE {
    LOGIN = 'login',
    RECIPE_DETAILS = 'recipe-details',
    COOKBOOK = 'cookbook',
    DEFAULT = 'default',
    ACCOUNT = 'account'
}

// export type HeaderProps = {
//     type: string;
//     title?: string;
//     logoutUser?: () => void;
//     backButtonTooltip?: string;
// };

export type BaseHeaderType = {
    type: HEADER_TYPE;
}

export type LoginHeaderType = BaseHeaderType & {
    backButtonTooltip: string;
}

export type RecipeDetailsHeaderType = BaseHeaderType & {
    title: string;
}

export type CookbookHeaderType = BaseHeaderType & {
    logoutUser: () => void;
}

export type AccountHeaderType = LoginHeaderType & RecipeDetailsHeaderType & {
    settings?: () => void;
    logoutUser: () => void;
}

export type HeaderType = 
    | AccountHeaderType
    | CookbookHeaderType 
    | RecipeDetailsHeaderType 
    | LoginHeaderType 
    | BaseHeaderType;