import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from"./config";
import {provider} from "./auth_google_provider_create";

const signInWithGooglePopup = () => {  
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const email = user.email;
        if(email && email.endsWith("@ucsd.edu")){
            console.log("UCSD email");
        }else{
            console.log("Not UCSD email");
            user.delete().then(() => {
                console.log("User deleted");
            }).catch((error) => {
                console.error(error);
            });
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
};

export {signInWithGooglePopup};