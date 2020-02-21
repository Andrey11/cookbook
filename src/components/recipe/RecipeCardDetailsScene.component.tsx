import React from "react";
import { Grid, GridCell } from "@rmwc/grid";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon
} from "@rmwc/top-app-bar";
import { Fab } from "@rmwc/fab";
import { useHistory } from "react-router-dom";
import { List, CollapsibleList, SimpleListItem } from "@rmwc/list";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import "@material/fab/dist/mdc.fab.css";
import "@material/list/dist/mdc.list.css";
import "@rmwc/list/collapsible-list.css";

const RecipeCardDetailsScene = () => {
  const history = useHistory();

  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon
              icon="arrow_back"
              onClick={() => history.goBack()}
            />
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon icon="share" />
            <TopAppBarNavigationIcon icon="favorite" />
            <TopAppBarNavigationIcon icon="more_vert" />
          </TopAppBarSection>
        </TopAppBarRow>
        <TopAppBarRow>
          <TopAppBarSection>
            <Fab icon="edit" style={{ marginTop: "3rem" }} />
            <TopAppBarTitle>Some text</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust prominent />

      <Grid>
        <GridCell span={12}>
          <List>
            <CollapsibleList
              startOpen
              handle={
                <SimpleListItem
                  text="Photos"
                  graphic="photo_library"
                  metaIcon="chevron_right"
                />
              }
            >
              <SimpleListItem text="Orange1" />
              <SimpleListItem text="Orange2" />
            </CollapsibleList>
          </List>
        </GridCell>
        <GridCell span={12}>
          <List>
            <CollapsibleList
              handle={
                <SimpleListItem
                  text="Ingridients"
                  graphic="shopping_basket"
                  metaIcon="chevron_right"
                />
              }
            >
              <SimpleListItem text="Orange1" />
              <SimpleListItem text="Orange2" />
            </CollapsibleList>
          </List>
        </GridCell>
        <GridCell span={12}>
          <List>
            <CollapsibleList
              handle={
                <SimpleListItem
                  text="Cooking instructions"
                  graphic="restaurant"
                  metaIcon="chevron_right"
                />
              }
            >
              <SimpleListItem text="Orange1" />
              <SimpleListItem text="Orange2" />
            </CollapsibleList>
          </List>
        </GridCell>
        <GridCell span={12}>
          <List>
            <CollapsibleList
              handle={
                <SimpleListItem
                  text="Additional comments"
                  graphic="menu_book"
                  metaIcon="chevron_right"
                />
              }
            >
              <SimpleListItem text="Orange1" />
              <SimpleListItem text="Orange2" />
            </CollapsibleList>
          </List>
        </GridCell>
        <GridCell span={12}>
          <List>
            <CollapsibleList
              handle={
                <SimpleListItem
                  text="Tags"
                  graphic="label"
                  metaIcon="chevron_right"
                />
              }
            >
              <SimpleListItem text="Orange1" />
              <SimpleListItem text="Orange2" />
            </CollapsibleList>
          </List>
        </GridCell>
      </Grid>
    </>
  );
};

export default RecipeCardDetailsScene;
