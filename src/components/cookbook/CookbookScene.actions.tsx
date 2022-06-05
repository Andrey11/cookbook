import { AppDispatch } from '../../store';
import {
    onLoadCookbook,
    onLoadCookbookSuccess,
    onLoadCookbookError,
    onBeginLoadRecipe,
    onLoadRecipeSuccess,
    onBeginCreateRecipe,
    onCreateRecipeNameChange,
    onCreateRecipeImageUrlChange,
    onCreateRecipeAction,
    onEndCreateRecipe,
    onLoadAllRecipesSuccess,
    onAddRecipeSuccess,
} from './CookbookScene.reducer';

import { Cookbook } from './Cookbook.types';

import Firebase from '../firebase/Firebase';
import {
    Recipe,
    RecipeState,
    RecipesState,
} from 'components/recipe/RecipeCard.types';
import { Url } from 'url';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

export const loadCookbook = (id: string) => (dispatch: AppDispatch) => {
    dispatch(onLoadCookbook(id));
    const fb = Firebase.getInstance();

    fb.doLoadCookbookById(id)
        .then((querySnapshot: any) => {
            console.log(`${querySnapshot.id} => ${querySnapshot.data().name}`);
            const recipes = querySnapshot.data().recipes.map((item: any) => {
                const recipe: Recipe = {
                    id: item.id,
                };
                return recipe;
            });

            const book: Cookbook = {
                id: querySnapshot.id,
                name: querySnapshot.data().name,
                recipes,
            };
            dispatch(onLoadCookbookSuccess(book));
        })
        .catch(() => {
            dispatch(onLoadCookbookError('Error'));
        });
};

export const loadRecipe = (id: string) => (dispatch: AppDispatch) => {
    const fb = Firebase.getInstance();
    const rec: Recipe = { id: id };
    const defaultRecipe: RecipeState = { id: id, loading: true, record: rec };
    dispatch(onBeginLoadRecipe(defaultRecipe));
    fb.doLoadRecipeById(id)
        .then((querySnapshot: any) => {
            console.log(`${querySnapshot.id} => ${querySnapshot.data().name}`);
            const recipeRecord: Recipe = {
                id: querySnapshot.id,
                name: querySnapshot.data().name,
                description: querySnapshot.data().description,
            };
            const recipe: RecipeState = {
                id: recipeRecord.id,
                record: recipeRecord,
                loaded: true,
                loading: false,
            };
            dispatch(onLoadRecipeSuccess(recipe));
        })
        .catch(() => {
            // TODO: fix this
            dispatch(onLoadCookbookError('Error'));
        });
};

export const convertToRecipeState = (rec: DocumentData) => {
    const recipeRec: Recipe = {
        id: rec.id,
        description: rec.data().description,
        name: rec.data().name,
    };

    const recipeState: RecipeState = {
        id: rec.id,
        loaded: true,
        loading: false,
        record: recipeRec,
    };

    return recipeState;
};

export const loadAllRecipes = () => (dispatch: AppDispatch) => {
    // dispatch(onBeginLoadRecipe(defaultRecipe));
    const fb = Firebase.getInstance();
    fb.doLoadAllRecipes()
        .then((querySnapshot: QuerySnapshot) => {
            const recipes: RecipesState = {
                records: {},
                filters: [],
            };

            querySnapshot.forEach((recipe: DocumentData) => {
                recipes.records = {
                    ...recipes.records,
                    [recipe.id]: convertToRecipeState(recipe),
                };
                // recipes.records = {
                //   ...convertToRecipeState(recipe)
                // };
            });

            console.log(
                '[CookbookScene.actions] loadAllRecipes | count=' +
                    querySnapshot.size
            );

            dispatch(onLoadAllRecipesSuccess(recipes));
        })
        .catch(() => {
            // TODO: fix this
            dispatch(onLoadCookbookError('Error'));
        });
};

export const showCreateRecipeDialog = () => (dispatch: AppDispatch) => {
    console.log('[CookbookScene.actions] showCreateRecipeDialog');
    dispatch(onBeginCreateRecipe());
};

export const hideCreateRecipeDialog = () => (dispatch: AppDispatch) => {
    console.log('[CookbookScene.actions] hideCreateRecipeDialog');
    dispatch(onEndCreateRecipe());
};

export const createRecipe = (name: string) => (dispatch: AppDispatch) => {
    console.log('[CookbookScene.actions] createRecipe');
    const fb = Firebase.getInstance();
    fb.doCreateRecipe(name)
        .then((result: any) => {
            // const id = result.id;
            console.log('result: ' + result.toString());
            // const rec = convertToRecipeState(result);

            fb.doAddRecipeIdToCurrentUserCookbook(result).then(() => {
                dispatch(onCreateRecipeAction());

                const recipeRec: Recipe = {
                    id: result.id,
                    name: name,
                };

                const recipeState: RecipeState = {
                    id: result.id,
                    loaded: false,
                    loading: false,
                    record: recipeRec,
                };

                dispatch(onLoadRecipeSuccess(recipeState));
                dispatch(onAddRecipeSuccess(recipeRec));
            });
        })
        .catch((reason: any) => {
            // TODO: fix this
            console.log('Got error: ' + reason);
            dispatch(onLoadCookbookError('Error'));
        });
};
export const createRecipeNameChange =
    (name: string) => (dispatch: AppDispatch) => {
        const fb = Firebase.getInstance();
        console.log(
            '[CookbookScene.actions] onCreateRecipeNameChange: ' +
                name +
                ', ' +
                fb.isInitialized
        );
        dispatch(onCreateRecipeNameChange(name));
    };

export const createRecipeImageUrlChange =
    (url: Url) => (dispatch: AppDispatch) => {
        const fb = Firebase.getInstance();
        console.log(
            '[CookbookScene.actions] createRecipeImageUrlChange: ' +
                url +
                ', ' +
                fb.isInitialized
        );
        dispatch(onCreateRecipeImageUrlChange(url));
    };
