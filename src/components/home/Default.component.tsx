import React, { useEffect } from "react";
import { Grid, GridCell } from "@rmwc/grid";
import RecipeCard from "../recipe/RecipeCard.container";
import Header from "../header/Header.container";
import { Recipe } from "components/recipe/RecipeCard.types";

type DefaultProps = {
  recipes: Array<Recipe>;
  loadAllRecipes: Function;
  shouldReloadAllRecipes: boolean;
};

const Default = ({
  recipes,
  loadAllRecipes,
  shouldReloadAllRecipes
}: DefaultProps) => {
  useEffect(() => {
    console.log("[Default.component] useEffect()");
    if (shouldReloadAllRecipes) {
      console.log("shouldReloadAllRecipes true");
      loadAllRecipes();
    }
  }, [shouldReloadAllRecipes]);

  const createRecipeCardList = () => {
    const allRecipes: Array<Recipe> = Object.values(recipes);
    if (allRecipes.length === 0) {
      return;
    }
    return allRecipes.map((recipe: Recipe, index) => (
      <GridCell span={4} key={index + "_" + recipe.id}>
        <RecipeCard
          recipeId={recipe.id}
          imageUrl="url(images/mb-bg-fb-16.png)"
          recipeTitle={"Recipe #" + recipe.name}
          loaded={true}
        />
      </GridCell>
    ));
  };

  return (
    <>
      <Header type={"default"} />
      <Grid>{createRecipeCardList()}</Grid>
    </>
  );
};

export default Default;
