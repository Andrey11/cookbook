import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import RecipeCardScene from "components/recipe/RecipeCardScene.component";
import RecipeCardDetailsScene from "components/recipe/RecipeCardDetailsScene.component";
import { Switch, Route } from "react-router-dom";

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
