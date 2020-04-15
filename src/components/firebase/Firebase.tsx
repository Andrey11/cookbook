import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/storage";
import { FirebaseConfig } from "../../config/FirebaseConfig";
import FirebaseContext, { withFirebase } from "./FirebaseContext";

class Firebase {
  auth: firebase.auth.Auth;
  database: firebase.firestore.Firestore;
  app: firebase.app.App;
  storage: firebase.storage.Storage;
  isInitialized: boolean;

  constructor() {
    this.app = firebase.initializeApp(FirebaseConfig);
    this.auth = firebase.auth(this.app);
    this.database = firebase.firestore(this.app);
    this.storage = firebase.storage(this.app);
    this.isInitialized = true;
    console.log("[Firebase][constructor] initialized");
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return this.auth.signInWithEmailAndPassword(email, password);
      });
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser) {
      this.auth.currentUser.updatePassword(password);
    } else {
      console.log("[Firebase][doPasswordUpdate] no current user");
    }
  };

  doLoadCurrentUserCookbook = () => {
    if (this.auth.currentUser) {
      return this.database
        .collection("cookbook")
        .doc(this.auth.currentUser.uid);
    }
    return this.database.collection("recipe").doc();
  };

  doLoadAllRecipes = () => {
    return this.database.collection("recipe");
  };

  // *** Database API ***
  doCreateCookbook = (cookbookId: string, username: string) => {
    return this.database
      .collection("cookbook")
      .doc(cookbookId)
      .set({
        name: username,
        recipes: []
      })
      .catch(function(error) {
        console.error(
          "[Firebase][doCreateCookbook] Error writing new message to database",
          error
        );
      });
  };

  doLoadCookbookById = (cookbookId: string) => {
    if (!cookbookId || cookbookId.length === 0) {
      return this.database.collection("recipe").doc();
    }
    return this.database.collection("cookbook").doc(cookbookId);
  };

  doCreateRecipe = (name: string) => {
    return this.database
      .collection("recipe")
      .add({ name: name })
      .catch(error => {
        console.error(
          "[Firebase][doCreateRecipe] Error writing new message to database",
          error
        );
      });
  };

  doAddRecipeIdToCurrentUserCookbook = (recipeRef: any) => {
    if (this.auth.currentUser) {
      return this.database
        .collection("cookbook")
        .doc(this.auth.currentUser.uid)
        .update({
          recipes: firebase.firestore.FieldValue.arrayUnion(recipeRef)
        })
        .catch(error => {
          console.error(
            "[Firebase][doAddRecipeIdToCurrentUserCookbook] Error writing new message to database",
            error
          );
        });
    }
    return Promise.reject(
      "[Firebase][doAddRecipeIdToCurrentUserCookbook] Error not authenticated"
    );
  };

  doLoadRecipeById = (recipeId: string) => {
    return this.database.collection("recipe").doc(recipeId || undefined);
  };
}

export default Firebase;
export { FirebaseContext, withFirebase };
