import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./config";
import { provider } from "./auth_google_provider_create";

//<TODO> Still needs to send the token to the backend
const signInWithGooglePopup = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("User signed in:", user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.error("Error Code:", errorCode);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// <TODO> ucsd.edu RESTRICTED, but the main restriction will have be done in the backend.
// <TODO> Still needs to send the token to the backend
const signInWithGooglePopupRestricted = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const email = user.email; // Get the user's email

      if (email && email.endsWith("@ucsd.edu")) {
        console.log("User signed in:", user);
      } else {
        console.error("User is not authorized. Email must end with @ucsd.edu");
        user
          .delete()
          .then(() => {
            console.log(
              "User account deleted due to unauthorized email domain.",
            );
          })
          .catch((error) => {
            console.error("Error deleting user account:", error);
          });
      }

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.error("Error Code:", errorCode);
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export { signInWithGooglePopup, signInWithGooglePopupRestricted };
