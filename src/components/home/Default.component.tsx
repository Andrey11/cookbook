import React, { useEffect, useState } from "react";
import { Typography } from "@rmwc/typography";
import { useHistory, useParams } from "react-router-dom";
import { Grid, GridCell } from "@rmwc/grid";
import RecipeCard from "../recipe/RecipeCard.component";
import { withFirebase } from "../firebase/Firebase";
import Header from "../header/Header.container";

type DefaultProps = {
  type: string;
};

const Default = ({ type }: DefaultProps) => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // if (shouldLogout) {
    //   console.log("Should logout");
    //   history.replace("/");
    // } else if (!loaded && cookbookId) {
    //   console.log("Not loaded, and cookbook is set");
    //   loadCookbook(cookbookId);
    // } else if (!loaded && !cookbookId) {
    //   console.log("Not logged in, and no cookbook is set");
    // }
  });

  return (
    <>
      <Header type={type} />
      <Grid>
        <GridCell span={4}>
          <RecipeCard
            recipeId={10}
            imageUrl="url(images/mb-bg-fb-16.png)"
            recipeTitle="Recipe #10"
          />
        </GridCell>
        <GridCell span={4}>
          <RecipeCard
            recipeId={11}
            imageUrl="url(images/image-001-600x400.png)"
            recipeTitle="Recipe #11"
          />
        </GridCell>
        <GridCell span={4}>
          <RecipeCard
            recipeId={12}
            imageUrl="url(images/image-002-600x400.png)"
            recipeTitle="Recipe #12"
          />
        </GridCell>
        <GridCell span={4}>
          <RecipeCard
            recipeId={13}
            imageUrl="url(images/image-003-600x400.png)"
            recipeTitle="Recipe #13"
          />
        </GridCell>
      </Grid>
    </>
  );
};

export default withFirebase(Default);
