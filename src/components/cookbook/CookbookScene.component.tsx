import React, { useEffect } from "react";
import { Typography } from "@rmwc/typography";
import { useHistory, useParams } from "react-router-dom";
import { Grid, GridCell } from "@rmwc/grid";
import { ChipSet, Chip } from "@rmwc/chip";
import RecipeCard from "../recipe/RecipeCard.component";
import { withFirebase } from "../firebase/Firebase";
import Header from "../header/Header.container";
import { Recipe } from "components/recipe/RecipeCard.types";

type CookbookSceneProps = {
  cookbookId: string;
  loaded: boolean;
  loading: boolean;
  shouldLogout: boolean;
  recipes: Array<Recipe>;
  loadCookbook: Function;
  // logoutUser: Function;
};

const CookbookScene = ({
  cookbookId,
  loaded,
  loading,
  recipes,
  shouldLogout,
  loadCookbook
}: // logoutUser
CookbookSceneProps) => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (shouldLogout && id) {
      console.log("Should logout");
      history.replace("/");
    } else if (!loading && !loaded && cookbookId) {
      console.log("Not loaded, and cookbook is set");
      loadCookbook(cookbookId);
    } else if (!loaded && !cookbookId) {
      console.log("Not logged in, and no cookbook is set");
    } else {
    }
  });

  const createRecipeCardList = () => {
    if (!recipes || recipes.length === 0) {
      return;
    }
    return recipes.map((recipe, index) => (
      <GridCell span={4} key={index + Math.round(Math.random() * 1000)}>
        <RecipeCard
          recipeId={recipe.id}
          imageUrl="url(images/mb-bg-fb-16.png)"
          recipeTitle={"Recipe #" + recipe.id}
        />
      </GridCell>
    ));
  };

  return (
    <>
      <Header type="cookbook" />
      <Grid>
        {createRecipeCardList()}
        <GridCell span={4}>
          <ChipSet>
            <Chip
              selected
              label="Cookies"
              onClick={() => loadCookbook("mnJyuZQWjsD2PJI7uVsc")}
            />
            <Chip label="Pizza" />
            <Chip label="Icecream" />
          </ChipSet>
          <Typography use="body1">Our Best Food</Typography>
          <Typography use="body2" style={{ marginTop: "-1rem" }}>
            by Some Author
          </Typography>
        </GridCell>
      </Grid>
    </>
  );
};

export default withFirebase(CookbookScene);
