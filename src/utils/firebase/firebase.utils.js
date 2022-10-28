import { initializeApp } from 'firebase/app'; // creates an app instance for you based on a configuration made
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);