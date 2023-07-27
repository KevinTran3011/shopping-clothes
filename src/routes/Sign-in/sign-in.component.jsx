import {auth,  signInWithGooglePopup, signInWithGoogleRedirect , createUserDocumentFromAuth} from '../../utils/firebase/firebase.util';
import { getRedirectResult } from 'firebase/auth';

import { useEffect } from 'react';
import SignUpForm from '../../component/sign-up form/sign-up-form.component';

const SignIn = () =>{
    useEffect(() => {
        const getRedirectResultAsync = async () => {
          const response = await getRedirectResult(auth);
          if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user)
          }
        };
    
        getRedirectResultAsync();
      }, []);


    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const logGoogleRedirectUser = async() =>{
        const { user} = await signInWithGoogleRedirect();
        console.log({user})
    }

    return(
        <div>
            <h1>Sign IN</h1>
            <button  onClick = {logGoogleUser}>
                Sign in with google pop up
            </button>

            <SignUpForm/>

            <button  onClick = {logGoogleUser}>
                Sign in with google Redirect
            </button>
        </div>
    )

}


export default SignIn;