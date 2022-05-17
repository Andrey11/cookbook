import React from 'react';
import styles from './App.module.scss';
import { Provider } from 'react-redux';
import store from './store';
import DefaultScene from 'components/home/Default.container';
import RecipeCardDetailsScene from 'components/recipe/RecipeCardDetailsScene.component';
import CookbookSceneContainer from 'components/cookbook/CookbookScene.container';
import LoginContainer from 'components/authentication/Login.container';
import CreateAccountContainer from 'components/authentication/CreateAccount.container';
import Scene from 'components/scene/Scene';
import { Route, Routes } from 'react-router-dom';

const App: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <div className={styles.App}>
                <Routes>
                    <Route
                        path="/recipe/:id"
                        element={
                            <Scene sceneName="RecipeCardDetailsScene">
                                <RecipeCardDetailsScene />
                            </Scene>
                        }
                    />
                    <Route
                        path="/cookbook/:id"
                        element={
                            <Scene sceneName="CookbookSceneContainer">
                                <CookbookSceneContainer />
                            </Scene>
                        }
                    />
                    <Route
                        path="/cookbook"
                        element={
                            <Scene sceneName="CookbookSceneContainer">
                                <CookbookSceneContainer />
                            </Scene>
                        }
                    />

                    <Route
                        path="/create"
                        element={
                            <Scene sceneName="CreateAccountContainer">
                                <CreateAccountContainer />
                            </Scene>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <Scene sceneName="LoginContainer">
                                <LoginContainer />
                            </Scene>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <Scene sceneName="DefaultScene">
                                <DefaultScene />
                            </Scene>
                        }
                    />
                </Routes>
            </div>
        </Provider>
    );
};

export default App;
