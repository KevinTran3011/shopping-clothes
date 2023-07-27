import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () =>{
    const [ formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email,password, confirmPassword} = formFields;
    
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
        <div>
            <h1>Sign up with email and password</h1>
            <form onSubmit ={handleSubmit}>
                <label>Display Name</label>
                <input type = 'text'  required onChange = {handleChange} name = 'displayName' value = {displayName}/>

                <label>E-mail</label>
                <input type = 'email' required onChange = {handleChange} name = 'email' value = {email}/>

                <label>Password</label>
                <input type = 'password'  required onChange = {handleChange} name = 'password' value = {password}/>

                <label>Confirm Password</label>
                <input type = 'password' required onChange = {handleChange} name = 'confirmPassword' value = {confirmPassword}/>

                <button type = 'submit'>Sign Up</button>


            </form>
        </div>
    )
}


export default SignUpForm;