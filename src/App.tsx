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
import RecipeCardScene from "components/recipe/RecipeCardScene.component";
import RecipeCardDetailsScene from "components/recipe/RecipeCardDetailsScene.component";
import { Switch, Route } from "react-router-dom";
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
        <Switch>
          <Route path="/recipe/:id">
            <RecipeCardDetailsScene />
          </Route>
          <Route path="/cookbook">
            <RecipeCardScene />
          </Route>
          <Route path="/">
            <RecipeCardScene />
          </Route>
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
