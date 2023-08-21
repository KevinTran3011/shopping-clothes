import { useState } from "react";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../store/user/user.action";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.style.scss'

const defaultFormField = {
    email: '',
    password: '',
}


const SignInForm = () =>{
    const dispatch = useDispatch();
    const [ formFields, setFormFields] = useState(defaultFormField);
    const { email, password} = formFields;

    
    const resetFormField = () => {
        setFormFields(defaultFormField);
      };
      
      // sign in with a google account
    const signInWithGoogle = async() =>{
      dispatch(googleSignInStart())
    }

    //check the input and then log in through email and password
    const handleSubmit = async(event) =>{
        event.preventDefault();

            try {
            dispatch(emailSignInStart(email,password))

            resetFormField()

              
            } catch (error) {
                switch (error.code) {
                    case 'auth/wrong-password':
                      alert('Wrong password, please enter the correct one or reset');
                      break;
                    case 'auth/user-not-found':
                      alert('User not found, please sign up');
                      break;
                    default:
                      console.log(error);
                  }
                  

            }
          
      
        
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})

    }



    return(
        <div className = "sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Sign In</span>
            <form onSubmit ={handleSubmit}>

              <FormInput label = "E-mail" type = 'email' required onChange = {handleChange} name = 'email' value = {email}/>

                <FormInput label = "Password" type = 'password'  required onChange = {handleChange} name = 'password' value = {password}/>

                <div className = 'buttonContainer'>
                    <Button  type = 'submit'>Sign In</Button>
                    <Button type = 'button' buttonType={BUTTON_TYPE_CLASSES.google}  onClick = {signInWithGoogle}>Google Sign In</Button> 
                     {/* type = 'button' has to be included to prevent sending the login, triggering the error */}


                </div>



            </form>
        </div>
    )
}


export default SignInForm;