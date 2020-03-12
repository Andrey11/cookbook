import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import { FirebaseConfig } from "../../config/FirebaseConfig";
import FirebaseContext, { withFirebase } from "./FirebaseContext";

class Firebase {
  auth: firebase.auth.Auth;
  database: firebase.firestore.Firestore;
  app: firebase.app.App;

  constructor() {
    this.app = firebase.initializeApp(FirebaseConfig);
    this.auth = firebase.auth();
    this.database = firebase.firestore(this.app);
    console.log("[Firebase][constructor] initialized");

    // this.doSignInWithEmailAndPassword("user1@test.com", "password");
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
  doLoadCookbookRecipies = (cookbookId: string) => {
    if (!cookbookId || cookbookId.length === 0) {
      return this.database.collection("cookbook").doc();
    }
    return this.database.collection("cookbook").doc(cookbookId);
  };

  doLoadCurrentUserCookbook = () => {
    if (this.auth.currentUser) {
      return this.database.collection("users").doc(this.auth.currentUser.uid);
    }
    return this.database.collection("users").doc();
  };
}

export default Firebase;
export { FirebaseContext, withFirebase };
