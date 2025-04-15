import {
  signInWithPopup,
  signOut /* GoogleAuthProvider */,
} from "firebase/auth";
import { auth } from "./config";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const signInWithGooglePopup = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.

      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // if(credential === null){
      //     console.log("credential is null");
      //     return;
      // }
      // const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      const email = user.email;
      if (email && email.endsWith("@ucsd.edu")) {
        console.log("UCSD email");
      } else {
        console.log("Not UCSD email");
        user
          .delete()
          .then(() => {
            console.log("User deleted");
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // IdP data available using getAdditionalUserInfo(result)
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error);

      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.error(error);
      // An error happened.
    });
};

export { signInWithGooglePopup, signOutUser };
