import React from 'react';
import styles from './App.module.scss';
import { Provider } from 'react-redux';
import store from './store';
import DefaultScene from 'components/home/DefaultScene';
import RecipeCardDetailsScene from 'components/recipe/RecipeCardDetailsScene.component';
import CookbookScene from 'components/cookbook/CookbookScene';
import CreateAccount from 'components/authentication/CreateAccount';
import Scene from 'components/scene/Scene';
import { Route, Routes } from 'react-router-dom';
import Login from 'components/authentication/Login';
import ResetPassword from 'components/authentication/ResetPassword';

const App: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <div className={styles.App} data-testid="app-screen">
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
                            <Scene sceneName="CookbookScene">
                                <CookbookScene />
                            </Scene>
                        }
                    />
                    <Route
                        path="/cookbook"
                        element={
                            <Scene sceneName="CookbookScene">
                                <CookbookScene />
                            </Scene>
                        }
                    />

                    <Route
                        path="/create"
                        element={
                            <Scene sceneName="CreateAccount">
                                <CreateAccount />
                            </Scene>
                        }
                    />
                    <Route
                        path="/reset"
                        element={
                            <Scene sceneName="ResetPassword">
                                <ResetPassword />
                            </Scene>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Scene sceneName="Login">
                                <Login />
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
