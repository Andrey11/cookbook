import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Counter from "./features/counter/Counter";
import { Provider } from "react-redux";
import store from "./store";
import { Typography } from "@rmwc/typography";
import { Button } from "@rmwc/button";
import { Grid, GridCell } from "@rmwc/grid";
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon
} from "@rmwc/card";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from "@rmwc/top-app-bar";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <>
          <TopAppBar fixed>
            <TopAppBarRow>
              <TopAppBarSection>
                <TopAppBarTitle>Fixed</TopAppBarTitle>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust />
          <Grid>
            <GridCell span={4}>
              <Card style={{ width: "21rem" }}>
                <CardPrimaryAction>
                  <CardMedia
                    sixteenByNine
                    style={{
                      backgroundImage: "url(images/backgrounds/mb-bg-fb-16.png)"
                    }}
                  />
                  <div style={{ padding: "0 1rem 1rem 1rem" }}>
                    <Typography use="headline6" tag="h2">
                      Our Changing Planet
                    </Typography>
                    <Typography
                      use="subtitle2"
                      tag="h3"
                      style={{ marginTop: "-1rem" }}
                    >
                      by Kurt Wagner
                    </Typography>
                    <Typography use="body1" tag="div">
                      Visit ten places on our planet that are undergoing the
                      biggest changes today.
                    </Typography>
                  </div>
                </CardPrimaryAction>
                <CardActions>
                  <CardActionButtons>
                    <CardActionButton>Read</CardActionButton>
                    <CardActionButton>Bookmark</CardActionButton>
                  </CardActionButtons>
                  <CardActionIcons>
                    <CardActionIcon onIcon="favorite" icon="favorite_border" />
                    <CardActionIcon icon="share" />
                    <CardActionIcon icon="more_vert" />
                  </CardActionIcons>
                </CardActions>
              </Card>
            </GridCell>
            <GridCell span={4}>
              <Card style={{ width: "21rem" }}>
                <CardPrimaryAction>
                  <CardMedia
                    sixteenByNine
                    style={{
                      backgroundImage: "url(images/backgrounds/mb-bg-fb-16.png)"
                    }}
                  />
                  <div style={{ padding: "0 1rem 1rem 1rem" }}>
                    <Typography use="headline6" tag="h2">
                      Our Best Food
                    </Typography>
                    <Typography
                      use="subtitle2"
                      tag="h3"
                      style={{ marginTop: "-1rem" }}
                    >
                      by Some Author
                    </Typography>
                    <Typography use="body1" tag="div">
                      Visit food that you like to eat, and you will always be
                      happy every day.
                    </Typography>
                  </div>
                </CardPrimaryAction>
                <CardActions>
                  <CardActionButtons>
                    <CardActionButton>Read</CardActionButton>
                    <CardActionButton>Bookmark</CardActionButton>
                  </CardActionButtons>
                  <CardActionIcons>
                    <CardActionIcon onIcon="favorite" icon="favorite_border" />
                    <CardActionIcon icon="share" />
                    <CardActionIcon icon="more_vert" />
                  </CardActionIcons>
                </CardActions>
              </Card>
            </GridCell>
            <GridCell span={4}>3</GridCell>
          </Grid>
          {/* <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Counter />
            <Button>Hello</Button>
          </div> */}
        </>
      </div>
    </Provider>
  );
};

export default App;
