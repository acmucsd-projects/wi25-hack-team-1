import { signOut } from "firebase/auth";
import {auth} from"./config";

const signOutUser = () => {
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
        console.error(error);
    // An error happened.
    });
};

export {signOutUser};
