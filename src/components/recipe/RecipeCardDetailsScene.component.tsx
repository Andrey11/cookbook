import React from "react";
// import { useHistory, useParams } from "react-router-dom";
import { Grid, GridCell } from "@rmwc/grid";
import {
  ImageList,
  ImageListItem,
  ImageListImageAspectContainer,
  ImageListImage,
  ImageListSupporting,
  ImageListLabel
} from "@rmwc/image-list";
import Header from "components/header/Header.container";
import { List, CollapsibleList, SimpleListItem } from "@rmwc/list";

const RecipeCardDetailsScene = () => {
  // const history = useHistory();
  // const { id } = useParams();

  return (
    <>
      <Header type="recipe-details" />

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
              <ImageList>
                {["images/mb-bg-fb-16.png", "images/mb-bg-fb-16.png"].map(
                  src => (
                    <ImageListItem
                      key={src + Math.round(Math.random() * 100)}
                      style={{ margin: "2px", width: "calc(100% / 5 - 4.2px)" }}
                    >
                      <ImageListImageAspectContainer
                        style={{ paddingBottom: "calc(100% / 1.5)" }}
                      >
                        <ImageListImage src={src} />
                      </ImageListImageAspectContainer>
                      <ImageListSupporting>
                        <ImageListLabel>Text label</ImageListLabel>
                      </ImageListSupporting>
                    </ImageListItem>
                  )
                )}
              </ImageList>
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
