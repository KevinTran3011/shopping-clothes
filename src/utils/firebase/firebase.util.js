import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'; //getting/setting document data

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


  //update categories from the js file to their respective places 
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    //create a collection ref
    const collectionRef = collection(db, collectionKey);
    // put object inside collectionRef as documents
    //make sure that the documents added are successfully added
    const batch = writeBatch(db);
    //attach functions for files to the batch that will make sure that the batch will get launched only when writeBatch is successful
    objectsToAdd.forEach((object)=>{
      //create new documents reference for each object based on titles
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
    await batch.commit();
    console.log('transaction successful');



  }

  export const getCategoriesAndDocuments = async()=>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
   return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
    
    // .reduce((acc, docSnapshot)=>{
    //   const { title, items} = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;

    //   return acc;

    // },{})

    // return categoryMap;
  }



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

  export const onAuthStateChangedListener = (callback) =>{
    onAuthStateChanged(auth, callback);
  } 