import { signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.util';


const SignIn = () =>{
    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>Sign IN</h1>
            <button  onClick = {logGoogleUser}>
                Sign in with google pop up
            </button>
        </div>
    )

}


export default SignIn;