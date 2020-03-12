import { AppDispatch, AppThunk } from "../../store";
import {
  onLoginSuccess,
  onLoginError,
  onLogoutSuccess,
  onLogoutError
} from "./AuthenticationSlice";
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
    })
    .catch((error: any) => {
      console.log("onLogoutError");
      dispatch(onLogoutError(error));
    });
};
