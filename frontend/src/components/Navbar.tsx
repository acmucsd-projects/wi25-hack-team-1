import React from "react";
import { Link } from "react-router-dom";
import {signOutUser} from "@/firebase/auth_sign_out";
import {signInWithGooglePopup} from "@/firebase/auth_google_signin_popup";
import { UserContext } from "@/firebase/UserContext";
import styles from "@/components/Navbar.module.css";
import { useContext } from "react";
import googleLogo from "@/assets/googleLogo.png"; // Adjust the path as necessary
import signOut from "@/assets/signOut.png"; // Adjust the path as necessary
const Navbar: React.FC = () => {
  const { firebaseUser } = useContext(UserContext);

  return (
    <nav className={ styles.navbar }>
      <ul className={ styles.list}>

        
        <li>
          <Link to="/">Home</Link>
        </li>
          {firebaseUser ? (
            <div className={styles.loginContainer}>
              <button type="button" className={styles.googleButton} onClick={signOutUser}>
              <img src={signOut} alt="Google logo" width="20" height="20" />
              
              </button>
              <p>Welcome, {firebaseUser.email}!</p>
            </div>

          ) : (
            <div className={styles.loginContainer}>
              <button type="button" className={styles.googleButton} onClick={signInWithGooglePopup}>
                <img src={googleLogo} alt="Google logo" width="20" height="20" />
                Sign in to Google
              </button>
              <p>Please sign in with a @ucsd.edu account</p>
            </div>
          )}
      </ul>
    </nav>
  );
};

export default Navbar;