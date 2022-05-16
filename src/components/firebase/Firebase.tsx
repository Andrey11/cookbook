import firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  signOut,
  setPersistence,
} from "firebase/auth";
import {
  doc,
  Firestore,
  getFirestore,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { FirebaseConfig } from "../../config/FirebaseConfig";
import FirebaseContext, { withFirebase } from "./FirebaseContext";

class Firebase {
  private static INSTANCE: Firebase;

  isInitialized!: boolean;
  app!: firebase.FirebaseApp;
  auth!: Auth;
  database!: Firestore;
  storage!: FirebaseStorage;

  private constructor(caller: string) {
    console.log("[Firebase][constructor] caller = " + caller);
  }

  static getInstance = () => {
    if (!Firebase.INSTANCE) {
      Firebase.INSTANCE = new Firebase("from getInstance");
      Firebase.INSTANCE.app = initializeApp(FirebaseConfig);
      Firebase.INSTANCE.auth = getAuth(Firebase.INSTANCE.app);
      Firebase.INSTANCE.database = getFirestore(Firebase.INSTANCE.app);
      Firebase.INSTANCE.storage = getStorage(Firebase.INSTANCE.app);
      Firebase.INSTANCE.isInitialized = true;
      console.log("[Firebase][constructor] initialized");
    }

    return Firebase.INSTANCE;
  };

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    createUserWithEmailAndPassword(Firebase.INSTANCE.auth, email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) => {
    const authModule: Auth = Firebase.INSTANCE.auth;
    return setPersistence(authModule, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(authModule, email, password);
    });
  };

  doSignOut = () => signOut(Firebase.INSTANCE.auth);

  doPasswordReset = (email: string) =>
    sendPasswordResetEmail(Firebase.INSTANCE.auth, email);

  doPasswordUpdate = (password: string) => {
    const authModule: Auth = Firebase.INSTANCE.auth;
    if (authModule.currentUser) {
      updatePassword(authModule.currentUser, password);
    } else {
      console.log("[Firebase][doPasswordUpdate] no current user");
    }
  };

  // *** Database API ***
  doCreateCookbook = (cookbookId: string, username: string) => {
    const db = Firebase.INSTANCE.database;

    return setDoc(doc(db, "cookbook", cookbookId), {
      name: username,
      recipes: [],
      created: serverTimestamp,
      modified: serverTimestamp,
    }).catch(function (error) {
      console.error(
        "[Firebase][doCreateCookbook] Error writing new message to database",
        error
      );
    });
  };

  doLoadCookbookById = (cookbookId: string) => {
    const db = Firebase.INSTANCE.database;
    if (!cookbookId || cookbookId.length === 0) {
      const docRecipeRef = doc(db, "recipe");
      return getDoc(docRecipeRef);
    }
    const docCookbookRef = doc(db, "cookbook", cookbookId);
    return getDoc(docCookbookRef);
  };

  doCreateRecipe = (name: string) => {
    const db = Firebase.INSTANCE.database;
    const auth = Firebase.INSTANCE.auth;

    if (auth.currentUser) {
      const recipeRef = doc(db, "recipe", auth.currentUser.uid);
      return setDoc(recipeRef, {
        name: name,
        created: serverTimestamp,
        modified: serverTimestamp,
        createdBy: auth.currentUser.uid,
        modifiedBy: auth.currentUser.uid,
      }).catch((error: any) => {
        console.error(
          "[Firebase][doCreateRecipe] Error writing new message to database",
          error
        );
      });
    }

    return Promise.reject(
      "[Firebase][doAddRecipeIdToCurrentUserCookbook] Error not authenticated"
    );
  };

  doAddRecipeIdToCurrentUserCookbook = (recipeRef: any) => {
    const db = Firebase.INSTANCE.database;
    const auth = Firebase.INSTANCE.auth;

    if (auth.currentUser) {
      const cookbookRef = doc(db, "cookbook", auth.currentUser.uid);

      return updateDoc(cookbookRef, {
        recipes: arrayUnion(recipeRef),
      }).catch((error: any) => {
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
    const db = Firebase.INSTANCE.database;
    const docRef = doc(db, "recipe", recipeId);
    return getDoc(docRef);
  };

  doLoadAllRecipes = () => {
    const db = Firebase.INSTANCE.database;
    return getDocs(collection(db, "recipe"));
  };
}

export default Firebase;
export { FirebaseContext, withFirebase };
