import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import RecipeCardSceneContainer from "components/recipe/RecipeCardScene.container";
import RecipeCardDetailsScene from "components/recipe/RecipeCardDetailsScene.component";
import Login from "components/authentication/CreateAccount.component";
import { Switch, Route } from "react-router-dom";
import { withFirebase } from "components/firebase/Firebase";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path="/recipe/:id">
            <RecipeCardDetailsScene />
          </Route>
          <Route path="/cookbook/:id">
            <RecipeCardSceneContainer cookbookId="mnJyuZQWjsD2PJI7uVsc" />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Provider>
  );
};

export default withFirebase(App);
