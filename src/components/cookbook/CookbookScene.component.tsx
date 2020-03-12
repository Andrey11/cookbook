import React, { useEffect, useState } from "react";
import { Typography } from "@rmwc/typography";
import { useHistory, useParams } from "react-router-dom";
import { Grid, GridCell } from "@rmwc/grid";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon
} from "@rmwc/top-app-bar";
import { ChipSet, Chip } from "@rmwc/chip";
import RecipeCard from "../recipe/RecipeCard.component";
import { withFirebase } from "../firebase/Firebase";

type CookbookSceneProps = {
  cookbookId: string;
  loaded: boolean;
  shouldLogout: boolean;
  loadCookbook: Function;
  logoutUser: Function;
};

const CookbookScene = ({
  loadCookbook,
  logoutUser,
  cookbookId,
  loaded,
  shouldLogout
}: CookbookSceneProps) => {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (shouldLogout) {
      history.replace("/");
    } else if (!loaded && cookbookId) {
      loadCookbook(cookbookId);
    }
  });

  if (id !== cookbookId) {
    if (!loaded) {
      // setBookId(cookbookId);
    }
    // history.replace("cookbook/" + cookbookId);
  }

  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon icon="menu" />
            <TopAppBarTitle>All Cards</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon icon="search" />
            <TopAppBarNavigationIcon icon="filter_list" />
            <TopAppBarNavigationIcon icon="add" />
            <TopAppBarNavigationIcon
              icon="directions_run"
              onClick={() => logoutUser()}
            />
          </TopAppBarSection>
        </TopAppBarRow>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarTitle>Another Row</TopAppBarTitle>
            <ChipSet>
              <Chip selected label="Cookies" trailingIcon="close" />
              <Chip label="Pizza" trailingIcon="close" />
              <Chip label="Icecream" trailingIcon="close" />
            </ChipSet>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust prominent />
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
