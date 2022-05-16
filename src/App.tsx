import React from "react";
import styles from "./App.module.scss";
import { Provider } from "react-redux";
import store from "./store";
import DefaultScene from "components/home/Default.container";
import RecipeCardDetailsScene from "components/recipe/RecipeCardDetailsScene.component";
import CookbookSceneContainer from "components/cookbook/CookbookScene.container";
import LoginContainer from "components/authentication/Login.container";
import CreateAccountContainer from "components/authentication/CreateAccount.container";
import SceneContainer from "components/scene/Scene.container";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Routes>
          <Route
            path="/recipe/:id"
            element={
              <SceneContainer sceneName="RecipeCardDetailsScene">
                <RecipeCardDetailsScene />
              </SceneContainer>
            }
          />
          <Route
            path="/cookbook/:id"
            element={
              <SceneContainer sceneName="CookbookSceneContainer">
                <CookbookSceneContainer />
              </SceneContainer>
            }
          />
          <Route
            path="/cookbook"
            element={
              <SceneContainer sceneName="CookbookSceneContainer">
                <CookbookSceneContainer />
              </SceneContainer>
            }
          />

          <Route
            path="/create"
            element={
              <SceneContainer sceneName="CreateAccountContainer">
                <CreateAccountContainer />
              </SceneContainer>
            }
          />

          <Route
            path="/login"
            element={
              <SceneContainer sceneName="LoginContainer">
                <LoginContainer />
              </SceneContainer>
            }
          />
          <Route
            path="/"
            element={
              <SceneContainer sceneName="DefaultScene">
                <DefaultScene />
              </SceneContainer>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
