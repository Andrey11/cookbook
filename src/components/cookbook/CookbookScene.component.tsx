import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, GridCell } from "@rmwc/grid";
import { ChipSet, Chip } from "@rmwc/chip";
import { TextField } from "@rmwc/textfield";
import { Fab } from "@rmwc/fab";
import RecipeCard from "../recipe/RecipeCard.container";
import Header from "../header/Header.container";
import { Recipe } from "components/recipe/RecipeCard.types";
import AddRecipeDialog from "../recipe/AddRecipeDialog.container";

type CookbookSceneProps = {
  cookbookId: string;
  loaded: boolean;
  loading: boolean;
  shouldLogout: boolean;
  isFirebaseInitialized: boolean;
  recipes: Array<Recipe>;
  loadCookbook: (cookbookId: string) => void;
  shouldLoadCookbook: boolean;
  showCreateRecipeDialog: () => void;
};

const CookbookScene = ({
  cookbookId,
  loaded,
  recipes,
  shouldLogout,
  loadCookbook,
  shouldLoadCookbook,
  isFirebaseInitialized,
  showCreateRecipeDialog
}: CookbookSceneProps) => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (!isFirebaseInitialized) {
      console.log("Should wait for init");
    } else if (shouldLogout && id) {
      console.log("Should logout");
      history.replace("/");
    } else if (shouldLoadCookbook) {
      console.log("Not loaded, and cookbook is set");
      loadCookbook(cookbookId);
    } else if (!loaded && !cookbookId) {
      console.log("Not logged in, and no cookbook is set");
    } else {
      console.log("What is happening");
    }
  });

  const createRecipeCardList = () => {
    if (!recipes || recipes.length === 0) {
      return;
    }
    return recipes.map((recipe, index) => (
      <GridCell span={6} key={index + "_" + recipe.id}>
        <RecipeCard
          recipeId={recipe.id}
          imageUrl="url(images/mb-bg-fb-16.png)"
          recipeTitle={"Recipe #" + recipe.id}
          isLoaded={false}
        />
      </GridCell>
    ));
  };

  return (
    <>
      <Header type="cookbook" />
      <AddRecipeDialog />
      <Grid>
        {createRecipeCardList()}
        <GridCell span={6}>
          <ChipSet>
            <Chip
              selected
              label="Cookies"
              onClick={() => loadCookbook("")}
              // onClick={() => loadCookbook("mnJyuZQWjsD2PJI7uVsc")}
            />
            <Chip label="Pizza" />
            <Chip
              label="Icecream"
              trailingIcon="cancel"
              onRemove={() => {
                console.log("removed");
              }}
            />
          </ChipSet>
          <TextField icon="search" trailingIcon="close" />
        </GridCell>
      </Grid>

      <Fab
        icon="restaurant"
        className="app-fab--absolute"
        onClick={() => showCreateRecipeDialog()}
      />
    </>
  );
};

export default CookbookScene;
