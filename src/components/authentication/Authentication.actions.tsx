import { AppDispatch } from '../../store';
import {
    onLoginSuccess,
    onLoginError,
    onLogoutSuccess,
    onLogoutError,
    onCreateUserSuccess,
    onCreateUserError,
    onFirebaseInitialized,
    onPasswordResetSuccess,
} from './Authentication.reducer';
import { resetCookbook } from '../cookbook/CookbookScene.reducer';
import Firebase from '../firebase/Firebase';
import { User, AuthState } from './Authentication.types';
import { resetRecipes } from '../recipe/recipesSlice';

export const login =
    (username: string, password: string) => (dispatch: AppDispatch) => {
        const firebase = Firebase.getInstance();

        firebase
            .doSignInWithEmailAndPassword(username, password)
            .then((result: any) => {
                const currentUser = result.user;
                const user: User = {
                    id: currentUser.uid,
                    loggedIn: true,
                    username: currentUser.email,
                    password: password,
                    avatarUrl: currentUser.avatarUrl,
                    cookbookId: currentUser.uid,
                    cookbooks: [],
                    recipes: [],
                };
                dispatch(onLoginSuccess(user));
            })
            .catch((error: any) => {
                dispatch(onLoginError(error));
            });
    };

export const checkAuthState = () => (dispatch: AppDispatch) => {
    console.log('[Authentication.actions][checkAuthState] Scene.component[useEffect]');

    const firebase = Firebase.getInstance();

    firebase.auth.onAuthStateChanged((fbUser) => {
        let user: User | undefined;
        let isLoggedIn = false;

        const authState = fbUser ? fbUser?.email : 'not logged in';
        console.log('AuthStateChanged: ' + authState);

        if (fbUser) {
            isLoggedIn = true;
            user = {
                id: fbUser.uid,
                loggedIn: true,
                password: '',
                avatarUrl: null,
                username: fbUser.email || '',
                cookbookId: fbUser.uid,
                cookbooks: [],
                recipes: [],
            };
        }

        const userState: AuthState = {
            user: user,
            status: 'idle',
            loggedIn: isLoggedIn,
            isFirebaseInitialized: true,
            authVerfied: true,
            userInfoLoaded: false,
        };

        dispatch(onFirebaseInitialized(userState));
    });
};

export const logout = () => (dispatch: AppDispatch) => {
    console.log('Action logout has been called');
    const firebase = Firebase.getInstance();

    firebase
        .doSignOut()
        .then(() => {
            console.log('onLogoutSuccess');
            dispatch(onLogoutSuccess({}));
            dispatch(resetCookbook());
            dispatch(resetRecipes());
        })
        .catch((error: any) => {
            console.log('onLogoutError');
            dispatch(onLogoutError(error));
        });
};

export const createAccount =
    (username: string, password: string) => (dispatch: AppDispatch) => {
        console.log(
            'Action create account has been called, username=' +
                username +
                ', password=' +
                password,
        );
        const firebase = Firebase.getInstance();

        firebase
            .doCreateUserWithEmailAndPassword(username, password)
            .then((result: any) => {
                const currentUser = result.user;
                const user: User = {
                    id: currentUser.uid,
                    loggedIn: true,
                    username: currentUser.email,
                    password: password,
                    avatarUrl: currentUser.avatarUrl,
                    cookbookId: currentUser.uid,
                    cookbooks: [],
                    recipes: [],
                };
                console.log('created user');
                dispatch(onCreateUserSuccess(user));
                return Promise.all([
                    firebase.doCreateCookbook(currentUser.uid, user.username),
                    firebase.doAddCreatedUser(currentUser.uid, user.username),
                ]);
            })
            .catch((error: any) => {
                dispatch(onCreateUserError(error));
            });
    };

export const resetPassword = (username: string) => (dispatch: AppDispatch) => {
    console.log('Action reset password has been called, username=' + username);
    const firebase = Firebase.getInstance();

    firebase
        .doPasswordReset(username)
        .then(() => {
            dispatch(onPasswordResetSuccess({}));
        })
        .catch((reason: any) => {
            console.log('Got Error: reset password: ' + reason);
        });
};
