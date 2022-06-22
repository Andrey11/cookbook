import { UserData } from '../authentication/Authentication.types';
import firebase, { initializeApp } from 'firebase/app';
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
} from 'firebase/auth';
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
    DocumentData,
    DocumentReference,
    addDoc,
} from 'firebase/firestore';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { FirebaseConfig } from '../../config/FirebaseConfig';
import FirebaseContext, { withFirebase } from './FirebaseContext';

class Firebase {
    private static INSTANCE: Firebase;

    isInitialized!: boolean;
    app!: firebase.FirebaseApp;
    auth!: Auth;
    database!: Firestore;
    storage!: FirebaseStorage;

    private constructor(caller: string) {
        console.log('[Firebase][constructor] caller = ' + caller);
    }

    static getInstance = () => {
        if (!Firebase.INSTANCE) {
            Firebase.INSTANCE = new Firebase('from getInstance');
            Firebase.INSTANCE.app = initializeApp(FirebaseConfig);
            Firebase.INSTANCE.auth = getAuth(Firebase.INSTANCE.app);
            Firebase.INSTANCE.database = getFirestore(Firebase.INSTANCE.app);
            Firebase.INSTANCE.storage = getStorage(Firebase.INSTANCE.app);
            Firebase.INSTANCE.isInitialized = true;
            console.log('[Firebase][constructor] initialized');
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
            console.log('[Firebase][doPasswordUpdate] no current user');
        }
    };

    // *** Database API ***
    doAddCreatedUser = (cookbookId: string, username: string) => {
        const db: Firestore = Firebase.INSTANCE.database;
        const cookbookRef: DocumentReference<DocumentData> = doc(
            db,
            'cookbook',
            cookbookId
        );
        const docRef: DocumentReference<DocumentData> = doc(
            db,
            'users',
            cookbookId
        );
        return setDoc(docRef, {
            cookbook: cookbookRef,
            name: username,
        }).catch((reason: any) => {
            console.error(
                '[Firebase][doAddCreatedUser] Error creating user in users doc',
                reason
            );
        });
    };

    doUpdateUserInfo = (userId: string, userData: any) => {
        const db: Firestore = Firebase.INSTANCE.database;
        const docRef: DocumentReference<DocumentData> = doc(
            db,
            'users',
            userId
        );
         return updateDoc(docRef, {
            nickname: userData.nickname,
            firstname: userData.firstname,
            lastname: userData.lastname,
            avatarName: userData.avatarName
        }).catch((reason: any) => {
            console.error(
                '[Firebase][doUpdateUserInfo] Error updating user in users doc',
                reason
            );
        });
    };

    doCreateCookbook = (cookbookId: string, username: string) => {
        const db = Firebase.INSTANCE.database;
        const userRef: DocumentReference<DocumentData> = doc(
            db,
            'users',
            cookbookId
        );
        const docRef: DocumentReference<DocumentData> = doc(
            db,
            'cookbook',
            cookbookId
        );
        return setDoc(docRef, {
            name: username,
            user: userRef,
            recipes: [],
            created: serverTimestamp(),
            modified: serverTimestamp(),
        }).catch((error: any) => {
            console.error(
                '[Firebase][doCreateCookbook] Error writing new message to db',
                error
            );
        });
    };

    doLoadCookbookById = (cookbookId: string) => {
        const db = Firebase.INSTANCE.database;
        if (!cookbookId || cookbookId.length === 0) {
            const docRecipeRef = doc(db, 'recipe');
            return getDoc(docRecipeRef);
        }
        const docCookbookRef = doc(db, 'cookbook', cookbookId);
        return getDoc(docCookbookRef);
    };

    doCreateRecipe = async (name: string, userData: UserData) => {
        const db = Firebase.INSTANCE.database;
        const auth = Firebase.INSTANCE.auth;

        if (auth.currentUser) {
            const userRef: DocumentReference<DocumentData> = doc(
                db,
                'users',
                auth.currentUser.uid
            );
            try {
                return await addDoc(collection(db, 'recipe'), {
                    name: name,
                    created: serverTimestamp(),
                    modified: serverTimestamp(),
                    createdBy: userRef,
                    modifiedBy: userRef,
                    modifiedUser: {...userData}
                });
            } catch (error) {
                console.error(
                    '[Firebase][doCreateRecipe] Error writing message to db',
                    error
                );
            }
        }

        return Promise.reject(
            '[Firebase][doAddRecipeIdToCurrentUserCookbook] Not authenticated'
        );
    };

    doAddRecipeIdToCurrentUserCookbook = (recipeRef: any) => {
        const db = Firebase.INSTANCE.database;
        const auth = Firebase.INSTANCE.auth;

        if (auth.currentUser) {
            const cookbookRef = doc(db, 'cookbook', auth.currentUser.uid);

            return updateDoc(cookbookRef, {
                recipes: arrayUnion(recipeRef),
            }).catch((error: any) => {
                console.error(
                    '[Firebase][doAddRecipeIdToCurrentUserCookbook] ' + 
                    'Error writing new message to db',
                    error
                );
            });
        }
        return Promise.reject(
            '[Firebase][doAddRecipeIdToCurrentUserCookbook] Not authenticated'
        );
    };

    doUploadAvatar = (userId: string, file: any) => {
        const storage: FirebaseStorage = Firebase.INSTANCE.storage;
        const gsAvatars = ref(storage, `avatars/${userId}/${file.name}`);

        return uploadBytes(gsAvatars, file).then((snapshot) => {
            return snapshot.ref.name;
        });
    };

    doGetAvatarImageById = (avatarPath: string) => {
        const storage: FirebaseStorage = Firebase.INSTANCE.storage;
        const gsReference = ref(storage, `avatars/${avatarPath}`);

        return getDownloadURL(gsReference).then((avatarUrl) => {
            return avatarUrl;
        })
    };

    doLoadUserById = (userId: string) => {
        const db: Firestore = Firebase.INSTANCE.database;
        const docRef: DocumentReference<DocumentData> = doc(
            db,
            'users',
            userId
        );
        return getDoc(docRef);
    };

    doLoadRecipeById = (recipeId: string) => {
        const db = Firebase.INSTANCE.database;
        const docRef = doc(db, 'recipe', recipeId);
        return getDoc(docRef);
    };

    doLoadAllRecipes = () => {
        const db = Firebase.INSTANCE.database;
        return getDocs(collection(db, 'recipe'));
    };
}

export default Firebase;
export { FirebaseContext, withFirebase };
