import React from "react";
import { Typography } from "@rmwc/typography";
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
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";

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
