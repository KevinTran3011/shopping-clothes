import {auth,  signInWithGooglePopup, signInWithGoogleRedirect , createUserDocumentFromAuth} from '../../utils/firebase/firebase.util';
import { getRedirectResult } from 'firebase/auth';
import './authentication.style.scss'
import { useEffect } from 'react';
import SignUpForm from '../../component/sign-up form/sign-up-form.component';
import SignInForm from '../../component/sign-in-form/sign-in-form.component';

const SignIn = () =>{
  //create function that will check the data in the database
    useEffect(() => {
        const getRedirectResultAsync = async () => {
          const response = await getRedirectResult(auth);

          if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user)
          }
        };
    
        getRedirectResultAsync();
      }, []);

// create user through google pop up
    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const logGoogleRedirectUser = async() =>{
        const { user} = await signInWithGoogleRedirect();
        console.log({user})
    }

    return(
        <div className = 'authentication-container'>
            <SignInForm/>
            <SignUpForm/>

        </div>
    )

}


export default SignIn;