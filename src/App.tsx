import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./store";
import DefaultScene from "components/home/Default.container";
import RecipeCardDetailsScene from "components/recipe/RecipeCardDetailsScene.component";
import CookbookSceneContainer from "components/cookbook/CookbookScene.container";
import LoginContainer from "components/authentication/Login.container";
import CreateAccountContainer from "components/authentication/CreateAccount.container";
import SceneContainer from "components/scene/Scene.container";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path="/recipe/:id">
            <SceneContainer sceneName="RecipeCardDetailsScene">
              <RecipeCardDetailsScene />
            </SceneContainer>
          </Route>
          <Route path="/cookbook/:id">
            <SceneContainer sceneName="CookbookSceneContainer">
              <CookbookSceneContainer />
            </SceneContainer>
          </Route>
          <Route path="/cookbook">
            <SceneContainer sceneName="CookbookSceneContainer">
              <CookbookSceneContainer />
            </SceneContainer>
          </Route>
          <Route path="/create">
            <SceneContainer sceneName="CreateAccountContainer">
              <CreateAccountContainer />
            </SceneContainer>
          </Route>
          <Route path="/login">
            <SceneContainer sceneName="LoginContainer">
              <LoginContainer />
            </SceneContainer>
          </Route>
          <Route path="/">
            <SceneContainer sceneName="DefaultScene">
              <DefaultScene />
            </SceneContainer>
          </Route>
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
