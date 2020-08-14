import { AppDispatch } from "../../store";
import {
  onFormUpdate,
  onCreateUserFormUpdate
} from "../../reducers/UserInterface.reducer";
import {
  onLoginSuccess,
  onLoginError,
  onLogoutSuccess,
  onLogoutError,
  onClearError,
  onCreateUserSuccess,
  onCreateUserError,
  onFirebaseInitialized
} from "./Authentication.reducer";
import {
  resetCookbook,
  resetRecipes
} from "components/cookbook/CookbookScene.reducer";
import Firebase from "../firebase/Firebase";
import {
  User,
  AuthState,
  FormFieldState,
  ErrorCode,
  FormError
} from "./Authentication.types";

const firebase = Firebase.getInstance();

export const dismissError = () => (dispatch: AppDispatch) => {
  dispatch(onClearError());
  dispatch(onFormUpdate(null));
  dispatch(onCreateUserFormUpdate({ errorMessage: "", hasError: false }));
};

export const login = (formFields: Array<FormFieldState>) => (
  dispatch: AppDispatch
) => {
  const usernameValid: boolean = formFields[0].valid;
  const username: string = formFields[0].value;
  const passwordValid: boolean = formFields[1].valid;
  const password: string = formFields[1].value;

  if (!username || !password) {
    dispatch(onLoginError("username or password is not present"));
    return;
  }

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
        recipes: []
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

  firebase.auth.onAuthStateChanged((fbUser: firebase.User | null) => {
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
        recipes: []
      };
    }

    const userState: AuthState = {
      user: user,
      loggedIn: isLoggedIn,
      isFirebaseInitialized: true
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

export const createAccount = (options: Array<FormFieldState>) => (
  dispatch: AppDispatch
) => {
  const emailState: FormFieldState = options[0];
  const pwdState: FormFieldState = options[1];
  const errorList: Array<FormError> = [];
  if (!emailState.valid) {
    const emailError: FormError = {
      errorMessage: "Email invalid",
      errorCode: ErrorCode.EmailInvalid.toString(),
      fieldId: "email"
    };
    errorList.push(emailError);
  }
  if (!pwdState.valid) {
    const pwdError: FormError = {
      errorMessage: "Password invalid",
      errorCode: ErrorCode.PasswordInvalid.toString(),
      fieldId: "password"
    };
    errorList.push(pwdError);
  }

  if (errorList.length > 0) {
    dispatch(onCreateUserError(errorList));
    dispatch(
      onCreateUserFormUpdate({
        errorMessage: "Please enter email and password",
        hasError: true,
        code: ErrorCode.EmailPasswordEmpty
      })
    );
    return;
  }

  firebase
    .doCreateUserWithEmailAndPassword(emailState.value, pwdState.value)
    .then((result: any) => {
      const currentUser = result.user;
      const user: User = {
        id: currentUser.uid,
        loggedIn: true,
        username: currentUser.email,
        password: "",
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
