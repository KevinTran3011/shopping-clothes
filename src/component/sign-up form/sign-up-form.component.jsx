import { useContext, useState } from "react";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";

import FormInput from "../form-input/form-input.component";
import { UserContext } from "../context/user.context";
import './sign-up-form.style.scss'

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () =>{
    const [ formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email,password, confirmPassword} = formFields;
    
    const {setCurrentUser} = useContext(UserContext);

    const resetFormField = () => {
        setFormFields(defaultFormField);
      };
      

    const handleSubmit = async(event) =>{
        event.preventDefault(defaultFormField);

        password !== confirmPassword
        ? alert('passwords do not match')
        : (async () => {
            try {
              const {user} = await createAuthUserWithEmailAndPassword(email, password);

              setCurrentUser(user);

              await createUserDocumentFromAuth(user, {displayName});
              resetFormField()

              
            } catch (error) {

                if(error.code === 'auth/email-already-in-use'){
                    alert('email already existed. Please sign in or reset password')
                  }
                else if( error.message.includes('Firebase: Password should be at least 6 characters')){
                    alert('password must be at least 6 characters in length')
                }
              console.log('user creation encountered an error ', error.message);
            }
          })();
      
        
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})

    }



    return(
        <div className = "sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit ={handleSubmit}>
                <FormInput label = "Display Name" type = 'text'  required onChange = {handleChange} name = 'displayName' value = {displayName}/>

              <FormInput label = "E-mail" type = 'email' required onChange = {handleChange} name = 'email' value = {email}/>

                <FormInput label = "Password" type = 'password'  required onChange = {handleChange} name = 'password' value = {password}/>

                <FormInput label = "Confirm Password"  type = 'password' required onChange = {handleChange} name = 'confirmPassword' value = {confirmPassword}/>

                <Button  type = 'submit'>Sign Up</Button>


            </form>
        </div>
    )
}


export default SignUpForm;