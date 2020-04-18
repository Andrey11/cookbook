import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import "firebase/storage";
import "firebase/firebase-database";
import { FirebaseConfig } from "../../config/FirebaseConfig";
import FirebaseContext, { withFirebase } from "./FirebaseContext";

class Firebase {
  private static INSTANCE: Firebase;

  isInitialized!: boolean;
  app!: firebase.app.App;
  auth!: firebase.auth.Auth;
  database!: firebase.firestore.Firestore;
  storage!: firebase.storage.Storage;

  private constructor(caller: string) {
    console.log("[Firebase][constructor] caller = " + caller);
  }

  static getInstance = () => {
    if (!Firebase.INSTANCE) {
      Firebase.INSTANCE = new Firebase("from getInstance");
      Firebase.INSTANCE.app = firebase.initializeApp(FirebaseConfig);
      Firebase.INSTANCE.auth = firebase.auth(Firebase.INSTANCE.app);
      Firebase.INSTANCE.database = firebase.firestore(Firebase.INSTANCE.app);
      Firebase.INSTANCE.storage = firebase.storage(Firebase.INSTANCE.app);
      Firebase.INSTANCE.isInitialized = true;
      console.log("[Firebase][constructor] initialized");
    }

    return Firebase.INSTANCE;
  };

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    Firebase.INSTANCE.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) => {
    return Firebase.INSTANCE.auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return Firebase.INSTANCE.auth.signInWithEmailAndPassword(
          email,
          password
        );
      });
  };

  doSignOut = () => Firebase.INSTANCE.auth.signOut();

  doPasswordReset = (email: string) =>
    Firebase.INSTANCE.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => {
    if (Firebase.INSTANCE.auth.currentUser) {
      Firebase.INSTANCE.auth.currentUser.updatePassword(password);
    } else {
      console.log("[Firebase][doPasswordUpdate] no current user");
    }
  };

  // *** Database API ***
  doCreateCookbook = (cookbookId: string, username: string) => {
    return Firebase.INSTANCE.database
      .collection("cookbook")
      .doc(cookbookId)
      .set({
        name: username,
        recipes: [],
        created: firebase.database.ServerValue.TIMESTAMP,
        modified: firebase.database.ServerValue.TIMESTAMP
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
      return Firebase.INSTANCE.database.collection("recipe").doc();
    }
    return Firebase.INSTANCE.database.collection("cookbook").doc(cookbookId);
  };

  doCreateRecipe = (name: string) => {
    return Firebase.INSTANCE.database
      .collection("recipe")
      .add({
        name: name,
        created: firebase.database.ServerValue.TIMESTAMP,
        modified: firebase.database.ServerValue.TIMESTAMP,
        createdBy: Firebase.INSTANCE.auth.currentUser?.uid,
        modifiedBy: Firebase.INSTANCE.auth.currentUser?.uid
      })
      .catch((error: any) => {
        console.error(
          "[Firebase][doCreateRecipe] Error writing new message to database",
          error
        );
      });
  };

  doAddRecipeIdToCurrentUserCookbook = (recipeRef: any) => {
    if (Firebase.INSTANCE.auth.currentUser) {
      return Firebase.INSTANCE.database
        .collection("cookbook")
        .doc(Firebase.INSTANCE.auth.currentUser.uid)
        .update({
          recipes: firebase.firestore.FieldValue.arrayUnion(recipeRef)
        })
        .catch((error: any) => {
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
    return Firebase.INSTANCE.database
      .collection("recipe")
      .doc(recipeId || undefined);
  };

  doLoadAllRecipes = () => {
    return Firebase.INSTANCE.database.collection("recipe");
  };
}

export default Firebase;
export { FirebaseContext, withFirebase };
