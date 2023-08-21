import { useContext, useState } from "react";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../store/user/user.action";


import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss'
import { signUp } from "../store/user/user.saga";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () =>{
    const [ formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email,password, confirmPassword} = formFields;
    const dispatch = useDispatch();
    

    const resetFormField = () => {
        setFormFields(defaultFormField);
      };
      
        // check the input to se if it's valid
    const handleSubmit = async(event) =>{
        event.preventDefault(defaultFormField);

        password !== confirmPassword
        ? alert('passwords do not match')
        : (async () => {
            try {
              dispatch(signUpStart(email, password, displayName))
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