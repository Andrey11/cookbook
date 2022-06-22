import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, GridCell } from '@rmwc/grid';
// import { ChipSet, Chip } from '@rmwc/chip';
// import { TextField } from '@rmwc/textfield';
import { Fab } from '@rmwc/fab';
import RecipeCard from '../recipe/RecipeCard';
import Header from '../header/Header';
import { Recipe } from '../recipe/RecipeCard.types';
import AddRecipeDialog from '../recipe/dialog/AddRecipeDialog';
import { HEADER_TYPE } from '../header/Header.types';
import { logout } from '../authentication/Authentication.actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    getCookbookId,
    isLoaded,
    // isLoading,
    recipesList,
    shouldLoadCookbook,
    shouldLogout,
} from './CookbookScene.selector';
import { loadCookbook, showCreateRecipeDialog } from './CookbookScene.actions';

const CookbookScene: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const cookbookId = useAppSelector(getCookbookId);
    const recipes = useAppSelector(recipesList);
    const loaded = useAppSelector(isLoaded);
    // const loading = useAppSelector(isLoading);
    const doLoadCookbook = useAppSelector(shouldLoadCookbook);
    const doLogout = useAppSelector(shouldLogout);

    useEffect(() => {
        if (doLoadCookbook) {
            console.log('Not loaded, and cookbook is set');
            dispatch(loadCookbook(cookbookId));
        } else if (!loaded && !cookbookId) {
            console.log('Not logged in, and no cookbook is set');
        } else if (id && cookbookId && id !== cookbookId) {
            navigate('/cookbook/' + cookbookId, {replace: true});
        } else {
            console.log('What is happening');
        }
    }, [doLogout, id, doLoadCookbook, loaded, cookbookId]);

    const createRecipeCardList = () => {
        if (!recipes || recipes.length === 0) {
            return;
        }
        return recipes.map((recipe: Recipe, index: number) => {
            return (
                <GridCell span={6} key={index + '_' + recipe.id}>
                    <RecipeCard
                        recipeId={recipe.id}
                        // imageUrl="url(/images/mb-bg-fb-16.png)"
                        // recipeTitle={'Recipe #' + recipe.id}
                        // isLoaded={false}
                    />
                </GridCell>
            );
        });
    };

    return (
        <>
            <Header
                type={HEADER_TYPE.COOKBOOK}
                logoutUser={() => {
                    console.log('Why not calling logout?');
                    dispatch(logout());
                }}
            />
            <AddRecipeDialog />
            <Grid>
                {createRecipeCardList()}
                {/* <GridCell span={6}>
                    <ChipSet>
                        <Chip
                            selected
                            label="Cookies"
                            onClick={() => loadCookbook('')}
                            // onClick={() => loadCookbook("mnJyuZQWjsD2PJI7uVsc")}
                        />
                        <Chip label="Pizza" />
                        <Chip
                            label="Icecream"
                            trailingIcon="cancel"
                            onRemove={() => {
                                console.log('removed');
                            }}
                        />
                    </ChipSet>
                    <TextField icon="search" trailingIcon="close" />
                </GridCell> */}
            </Grid>

            <Fab
                icon="restaurant"
                className="app-fab--absolute"
                onClick={() => dispatch(showCreateRecipeDialog())}
            />
        </>
    );
};

export default CookbookScene;
