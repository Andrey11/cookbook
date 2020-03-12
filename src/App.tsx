import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import RecipeCardSceneContainer from "components/recipe/RecipeCardScene.container";
import RecipeCardDetailsScene from "components/recipe/RecipeCardDetailsScene.component";
import CookbookSceneContainer from "components/cookbook/CookbookScene.container";
import LoginContainer from "components/authentication/Login.container";
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
            {/* <RecipeCardSceneContainer cookbookId="MVNzqtXaUq7HJq0PgOrn" /> */}
            <CookbookSceneContainer />
          </Route>
          <Route path="/">
            <LoginContainer />
          </Route>
        </Switch>
      </div>
    </Provider>
  );
};

export default withFirebase(App);
