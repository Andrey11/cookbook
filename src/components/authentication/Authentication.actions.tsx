import { AppDispatch, AppThunk } from "../../store";
import {
  onLoginSuccess,
  onLoginError,
  onLogoutSuccess,
  onLogoutError,
  onCreateUserSuccess,
  onCreateUserError
} from "./Authentication.reducer";
import { resetCookbook } from "components/cookbook/CookbookScene.reducer";
import { User } from "./Authentication.types";
import Firebase from "../firebase/Firebase";

export const login = (
  username: string,
  password: string,
  firebase: Firebase
) => (dispatch: AppDispatch) => {
  console.log(
    "Action login has been called, username=" +
      username +
      ", password=" +
      password
  );

  firebase
    .doSignInWithEmailAndPassword(username, password)
    .then((result: any) => {
      const test = result;
      const currentUser = result.user;
      const user: User = {
        id: currentUser.uid,
        loggedIn: true,
        username: currentUser.email,
        password: password,
        avatarUrl: currentUser.avatarUrl,
        cookbookId: currentUser.uid,
        cookbooks: [],
        recipes: []
      };
      console.log("logged in");
      dispatch(onLoginSuccess(user));
    })
    .catch((error: any) => {
      dispatch(onLoginError(error));
    });
};

export const logout = (firebase: Firebase) => (dispatch: AppDispatch) => {
  console.log("Action logout has been called");

  firebase
    .doSignOut()
    .then((result: any) => {
      const test = result;
      console.log("onLogoutSuccess");
      dispatch(onLogoutSuccess());
      dispatch(resetCookbook());
    })
    .catch((error: any) => {
      console.log("onLogoutError");
      dispatch(onLogoutError(error));
    });
};

export const createAccount = (
  username: string,
  password: string,
  firebase: Firebase
) => (dispatch: AppDispatch) => {
  console.log(
    "Action create account has been called, username=" +
      username +
      ", password=" +
      password
  );

  firebase
    .doCreateUserWithEmailAndPassword(username, password)
    .then((result: any) => {
      const test = result;
      const currentUser = result.user;
      const user: User = {
        id: currentUser.uid,
        loggedIn: true,
        username: currentUser.email,
        password: password,
        avatarUrl: currentUser.avatarUrl,
        cookbookId: currentUser.uid,
        cookbooks: [],
        recipes: []
      };
      console.log("created user");
      dispatch(onCreateUserSuccess(user));
      return firebase.doCreateCookbook(user.cookbookId || "", user.username);
    })
    .catch((error: any) => {
      dispatch(onCreateUserError(error));
    });
};
