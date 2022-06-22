import { AppDispatch } from '../../store';
import {
    onLoadCookbook,
    onLoadCookbookSuccess,
    onLoadCookbookError
} from './CookbookScene.reducer';

import {
    setRecipeDialogVisible
} from '../recipe/dialog/addRecipeSlice';

import { Cookbook } from './Cookbook.types';

import Firebase from '../firebase/Firebase';
import { Recipe, RecipeState, RecipesState } from '../recipe/RecipeCard.types';
import { DocumentData, getDoc, QuerySnapshot } from 'firebase/firestore';
import { 
    onBeginLoadRecipe, 
    onLoadAllRecipesSuccess, 
    onLoadRecipeSuccess 
} from '../recipe/recipesSlice';

export const loadCookbook = (id: string) => (dispatch: AppDispatch) => {
    dispatch(onLoadCookbook(id));
    const fb = Firebase.getInstance();

    fb.doLoadCookbookById(id)
        .then((querySnapshot: any) => {
            console.log(`${querySnapshot.id} => ${querySnapshot.data().name}`);
            const recipes: Array<Recipe> = querySnapshot
                .data()
                .recipes.map((item: any) => {
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
    const defaultRecipe: RecipeState = {
        id: id,
        loading: true,
        record: rec,
        loaded: false,
    };
    dispatch(onBeginLoadRecipe(defaultRecipe));
    fb.doLoadRecipeById(id)
        .then((querySnapshot: any) => {
            const queryData: any = querySnapshot.data();
            console.log(`${querySnapshot.id} => ${queryData.name}`);

            const recipeRecord: Recipe = {
                id: querySnapshot.id,
                name: queryData.name,
                description: queryData.description,
                createdBy: '',
            };

            if (queryData.createdBy) {
                getDoc(queryData.createdBy)
                    .then((result: any) => {
                        console.log('Success: ' + result);
                        recipeRecord.createdBy = result.data().name;

                        const recipe: RecipeState = {
                            id: recipeRecord.id,
                            record: recipeRecord,
                            loaded: true,
                            loading: false,
                        };
                        dispatch(onLoadRecipeSuccess(recipe));
                    })
                    .catch((reason: any) => {
                        console.log('Got error: ' + reason);
                    });
            } else {
                const recipe: RecipeState = {
                    id: recipeRecord.id,
                    record: recipeRecord,
                    loaded: true,
                    loading: false,
                };
                dispatch(onLoadRecipeSuccess(recipe));
            }
        })
        .catch((reason: any) => {
            // TODO: fix this
            console.log('Got error: ' + reason);
            // dispatch(onLoadCookbookError('Error'));
        });
};

export const convertToRecipeState = (rec: DocumentData) => {
    const recipeInfo: any = rec.data();
    const recipeRec: Recipe = {
        id: rec.id,
        description: recipeInfo.description,
        name: recipeInfo.name,
        // createdBy: recipeInfo.createdBy.path()
    };

    const recipeState: RecipeState = {
        id: rec.id,
        loaded: true,
        loading: false,
        record: recipeRec,
    };

    return recipeState;

    // return getDoc(recipeInfo.createdBy)
    //     .then((result: any) => {
    //         recipeRec.createdBy = result.data().name;

    //         const recipeState: RecipeState = {
    //             id: rec.id,
    //             loaded: true,
    //             loading: false,
    //             record: recipeRec,
    //         };

    //         return recipeState;
    //     })
    //     .catch((reason: any) => {
    //         console.log('Got error: ' + reason);
    //     });
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
    dispatch(setRecipeDialogVisible(true));
};

// export const hideCreateRecipeDialog = () => (dispatch: AppDispatch) => {
//     console.log('[CookbookScene.actions] hideCreateRecipeDialog');
//     dispatch(onEndCreateRecipe());
// };

// export const createRecipe = (name: string) => (dispatch: AppDispatch) => {
//     console.log('[CookbookScene.actions] createRecipe');
//     const fb = Firebase.getInstance();
//     fb.doCreateRecipe(name)
//         .then((result: any) => {
//             // const id = result.id;
//             console.log('result: ' + result.toString());
//             // const rec = convertToRecipeState(result);

//             fb.doAddRecipeIdToCurrentUserCookbook(result).then(() => {
//                 dispatch(onCreateRecipeAction());

//                 const recipeRec: Recipe = {
//                     id: result.id,
//                     name: name,
//                 };

//                 const recipeState: RecipeState = {
//                     id: result.id,
//                     loaded: false,
//                     loading: false,
//                     record: recipeRec,
//                 };

//                 dispatch(onLoadRecipeSuccess(recipeState));
//                 dispatch(onAddRecipeSuccess(recipeRec));
//             });
//         })
//         .catch((reason: any) => {
//             // TODO: fix this
//             console.log('Got error: ' + reason);
//             dispatch(onLoadCookbookError('Error'));
//         });
// };
// export const createRecipeNameChange =
//     (name: string) => (dispatch: AppDispatch) => {
//         const fb = Firebase.getInstance();
//         console.log(
//             '[CookbookScene.actions] onCreateRecipeNameChange: ' +
//                 name +
//                 ', ' +
//                 fb.isInitialized
//         );
//         dispatch(onCreateRecipeNameChange(name));
//     };

// export const createRecipeImageUrlChange =
//     (url: string) => (dispatch: AppDispatch) => {
//         const fb = Firebase.getInstance();
//         console.log(
//             '[CookbookScene.actions] createRecipeImageUrlChange: ' +
//                 url +
//                 ', ' +
//                 fb.isInitialized
//         );
//         dispatch(onCreateRecipeImageUrlChange(url));
//     };
