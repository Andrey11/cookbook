import React from "react";
// import "../../App.scss";
import { Typography } from "@rmwc/typography";
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
import RecipeCard from "./RecipeCard.component";

const RecipeCardScene = () => {
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
            <TopAppBarNavigationIcon icon="more_vert" />
          </TopAppBarSection>
        </TopAppBarRow>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarTitle>Another Row</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust prominent />
      <Grid>
        <GridCell span={4}>
          <RecipeCard recipeId={10} />
        </GridCell>
        <GridCell span={4}>
          <RecipeCard recipeId={11} />
        </GridCell>
        <GridCell span={4}>
          <ChipSet>
            <Chip selected label="Cookies" />
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

export default RecipeCardScene;
