import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'; //getting/setting document data

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

  const googleProvider = new GoogleAuthProvider(); //GoogleAuthProvider is a prop

// set up an authenticator by google
  googleProvider.setCustomParameters({
    prompt: "select_account"

  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = ()=> signInWithRedirect( auth, googleProvider);


  //get user profile and check if it's in the database

  export const db = getFirestore();



  export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={displayName : '??????'}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    //take user data from database and check if it exists in the database
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    

        //if user data doesn't exist, create user data from userAuth in collection

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try{
          await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation}) //create user profile in database
        } catch(error){
          console.log(error.message);
        }

    }


    //if data exists return userDocRef
    return userDocRef;
  }


  export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)

  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)

  }


  //signout function

  export const signOutUser =async() =>await signOut(auth);