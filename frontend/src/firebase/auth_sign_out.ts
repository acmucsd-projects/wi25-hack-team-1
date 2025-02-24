import { signOut } from "firebase/auth";
import { auth } from "./config";

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
      console.error("Sign-out error:", error);
    });
};

export { signOutUser };
