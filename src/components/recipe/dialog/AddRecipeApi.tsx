import Firebase from '../../firebase/Firebase';
import { AppDispatch } from 'store';
import { 
    onAddRecipeSuccess, 
    onLoadCookbookError
} from '../../cookbook/CookbookScene.reducer';
import { Recipe, RecipeState } from '../RecipeCard.types';
import { setRecipeCreated } from './addRecipeSlice';
import { onLoadRecipeSuccess } from '../recipesSlice';
import { UserData } from '../../authentication/Authentication.types';

export const createRecipe = (name: string, userData: UserData) => 
(dispatch: AppDispatch) => {
    console.log('[AddRecipeApi] createRecipe');
    const fb = Firebase.getInstance();
    return fb.doCreateRecipe(name, userData)
        .then((result: any) => {
            console.log('result: ' + result.toString());
            
            fb.doAddRecipeIdToCurrentUserCookbook(result).then(() => {
                dispatch(setRecipeCreated(true));

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
