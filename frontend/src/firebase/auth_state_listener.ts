import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("User is signed in:", user);
    console.log("User ID:", uid);
    // ...
  } else {
    console.log("User is signed out");
    // User is signed out
    // ...
  }
});
