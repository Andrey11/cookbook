import React, { useEffect } from 'react';
import { Grid, GridCell } from '@rmwc/grid';
import RecipeCard from '../recipe/RecipeCard';
import Header from '../header/Header';
import { Recipe } from '../recipe/RecipeCard.types';
import { HEADER_TYPE } from '../header/Header.types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../authentication/Authentication.actions';
import {
    allRecipesList,
    shouldReloadAllRecipesList,
} from '../cookbook/CookbookScene.selector';
import { loadAllRecipes } from '../cookbook/CookbookScene.actions';

const DefaultScene: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const recipes = useAppSelector(allRecipesList);
    const shouldReloadAllRecipes = useAppSelector(shouldReloadAllRecipesList);

    useEffect(() => {
        if (shouldReloadAllRecipes) {
            console.log('shouldReloadAllRecipes true');
            dispatch(loadAllRecipes());
        }
    }, [shouldReloadAllRecipes]);

    const createRecipeCardList = () => {
        const allRecipes: Array<Recipe> = Object.values(recipes);
        if (allRecipes.length === 0) {
            return;
        }
        return allRecipes.map((recipe: Recipe, index) => (
            <GridCell span={4} key={index + '_' + recipe.id}>
                <RecipeCard
                    recipeId={recipe.id}
                    // imageUrl="url(../images/mb-bg-fb-16.png)"
                    // recipeTitle={'Recipe #' + recipe.name}
                    // loaded={true}
                />
            </GridCell>
        ));
    };

    return (
        <>
            <Header
                type={HEADER_TYPE.DEFAULT}
                logoutUser={() => dispatch(logout)}
                backButtonTooltip="Back to Home"
            />
            <main>
                <Grid>{createRecipeCardList()}</Grid>
            </main>
        </>
    );
};

export default DefaultScene;
