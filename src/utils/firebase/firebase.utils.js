import { initializeApp } from 'firebase/app'; // creates an app instance for you based on a configuration made
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // allows you access data inside the documents or change/add data

// We need to connect this to firebase console.

const firebaseConfig = {
  apiKey: "AIzaSyBOXETLcTT93z9gpWv8IZg7X-pKNiVeYaI",
  authDomain: "code-threads-db.firebaseapp.com",
  projectId: "code-threads-db",
  storageBucket: "code-threads-db.appspot.com",
  messagingSenderId: "532136710904",
  appId: "1:532136710904:web:0b0564b86660182a04610d",
  measurementId: "G-5LHJ5GY1YR"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); // Facebook can also be a provider

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); // this directly points to the database inside of the console

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log('userDocRef: ',userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log('userSnapshot exists: ', userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user: ', error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
