import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDJfOCCIWN60FvWtgLG2i8ED6f6HgHWno0",
    authDomain: "crwn-clothing-db-fc299.firebaseapp.com",
    projectId: "crwn-clothing-db-fc299",
    storageBucket: "crwn-clothing-db-fc299.appspot.com",
    messagingSenderId: "193484531792",
    appId: "1:193484531792:web:14035abc9df3a558424955"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider(); //GoogleAuthProvider is a prop


  provider.setCustomParameters({
    prompt: "select_account"

  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);