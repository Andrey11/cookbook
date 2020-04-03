import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import { FirebaseConfig } from "../../config/FirebaseConfig";
import FirebaseContext, { withFirebase } from "./FirebaseContext";

class Firebase {
  auth: firebase.auth.Auth;
  database: firebase.firestore.Firestore;
  app: firebase.app.App;
  isInitialized: boolean;

  constructor() {
    this.app = firebase.initializeApp(FirebaseConfig);
    this.auth = firebase.auth();
    this.database = firebase.firestore(this.app);
    this.isInitialized = true;
    console.log("[Firebase][constructor] initialized");
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser) {
      this.auth.currentUser.updatePassword(password);
    } else {
      console.log("[Firebase][doPasswordUpdate] no current user");
    }
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

  doLoadCurrentUserCookbook = () => {
    if (this.auth.currentUser) {
      return this.database
        .collection("cookbook")
        .doc(this.auth.currentUser.uid);
    }
    return this.database.collection("recipe").doc();
  };
}

export default Firebase;
export { FirebaseContext, withFirebase };
