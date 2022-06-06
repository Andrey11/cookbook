import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import FirebaseContext from 'components/firebase/FirebaseContext';
import { BrowserRouter } from 'react-router-dom';
import Firebase from 'components/firebase/Firebase';

describe('App tests', () => {
    const FirebaseInstance: any = {
        app: jest.fn(),
        auth: {
            onAuthStateChanged: jest.fn(),
        },
        database: jest.fn(),
        doAddCreatedUser: jest.fn(),
        doAddRecipeIdToCurrentUserCookbook: jest.fn(),
        doCreateCookbook: jest.fn(),
        doCreateRecipe: jest.fn(),
        doCreateUserWithEmailAndPassword: jest.fn(),
        doLoadAllRecipes: jest.fn(),
        doLoadCookbookById: jest.fn(),
        doLoadRecipeById: jest.fn(),
        doPasswordReset: jest.fn(),
        doPasswordUpdate: jest.fn(),
        doSignInWithEmailAndPassword: jest.fn(),
        doSignOut: jest.fn(),
        isInitialized: true,
        storage: jest.fn(),
    };

    beforeEach(() => {
        jest.spyOn(Firebase, 'getInstance').mockReturnValue(FirebaseInstance);
    });

    test('renders initial app screen', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <FirebaseContext.Provider value={FirebaseInstance}>
                        <App />
                    </FirebaseContext.Provider>
                </BrowserRouter>
            );
        });
        const appDom = screen.getByTestId('app-screen');
        expect(appDom).toBeInTheDocument();
        expect(Firebase.getInstance).toBeCalledTimes(1);
    });
});
