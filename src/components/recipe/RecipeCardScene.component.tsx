import React from "react";
import "../../App.scss";
import { Grid, GridCell } from "@rmwc/grid";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from "@rmwc/top-app-bar";
import RecipeCard from "./RecipeCard.component";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";

const RecipeCardScene = () => {
  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarTitle>All Cards</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
      <Grid>
        <GridCell span={4}>
          <RecipeCard />
        </GridCell>
        <GridCell span={4}>
          <RecipeCard />
        </GridCell>
        <GridCell span={4}>3</GridCell>
      </Grid>
    </>
  );
};

export default RecipeCardScene;
