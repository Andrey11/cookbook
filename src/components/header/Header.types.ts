export const HEADER_TYPE = {
    LOGIN: 'login',
    RECIPE_DETAILS: 'recipe-details',
    COOKBOOK: 'cookbook',
    DEFAULT: 'default',
};

export type HeaderProps = {
    type: string;
    logoutUser?: () => void;
    backButtonTooltip?: string;
};

export type LoginHeaderProps = {
    backButtonTooltip: string;
};
