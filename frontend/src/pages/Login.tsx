import React from "react";
import { signOutUser } from "@/firebase/auth_sign_out";
import { signInWithGooglePopupRestricted } from "@/firebase/auth_google_signin_popup";
import { UserContext } from "@/firebase/UserContext";
import { useContext } from "react";

const Login: React.FC = () => {
  const { firebaseUser } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to the login Page</h1>
      <button onClick={signInWithGooglePopupRestricted}>Sign in with Google (POPUP)</button>
      <button onClick={signOutUser}>Sign out</button>
      { firebaseUser ? (<p>Welcome, {firebaseUser.email}!</p>) : (<p>Please sign in.</p>) }
    </div>
  );
};

export default Login;
