import { AppDispatch } from "../../store";
import {
  onLoginSuccess,
  onLoginError,
  onLogoutSuccess,
  onLogoutError,
  onCreateUserSuccess,
  onCreateUserError,
  onFirebaseInitialized,
} from "./Authentication.reducer";
import {
  resetCookbook,
  resetRecipes,
} from "components/cookbook/CookbookScene.reducer";
import Firebase from "../firebase/Firebase";
import { User, AuthState } from "./Authentication.types";

const firebase = Firebase.getInstance();

export const login =
  (username: string, password: string) => (dispatch: AppDispatch) => {
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
  console.log(
    "[Authentication.actions][checkAuthState] from Scene.component[useEffect]"
  );

  firebase.auth.onAuthStateChanged((fbUser) => {
    let user: User | undefined;
    let isLoggedIn = false;

    if (fbUser) {
      isLoggedIn = true;
      user = {
        id: fbUser.uid,
        loggedIn: true,
        password: "",
        avatarUrl: null,
        username: fbUser.email || "",
        cookbookId: fbUser.uid,
        cookbooks: [],
        recipes: [],
      };
    }

    const userState: AuthState = {
      user: user,
      loggedIn: isLoggedIn,
      isFirebaseInitialized: true,
    };

    dispatch(onFirebaseInitialized(userState));
  });
};

export const logout = () => (dispatch: AppDispatch) => {
  console.log("Action logout has been called");

  firebase
    .doSignOut()
    .then(() => {
      console.log("onLogoutSuccess");
      dispatch(onLogoutSuccess());
      dispatch(resetCookbook());
      dispatch(resetRecipes());
    })
    .catch((error: any) => {
      console.log("onLogoutError");
      dispatch(onLogoutError(error));
    });
};

export const createAccount =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    console.log(
      "Action create account has been called, username=" +
        username +
        ", password=" +
        password
    );

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
        console.log("created user");
        dispatch(onCreateUserSuccess(user));
        return firebase.doCreateCookbook(user.cookbookId || "", user.username);
      })
      .catch((error: any) => {
        dispatch(onCreateUserError(error));
      });
  };
