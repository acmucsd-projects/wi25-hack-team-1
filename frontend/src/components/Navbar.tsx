import React from "react";
import { Link } from "react-router-dom";
import {signOutUser} from "@/firebase/auth_sign_out";
import {signInWithGooglePopup} from "@/firebase/auth_google_signin_popup";
import { UserContext } from "@/firebase/UserContext";
import styles from "@/components/Navbar.module.css";
import { useContext } from "react";

const Navbar: React.FC = () => {
  const { firebaseUser } = useContext(UserContext);

  return (
    <nav className={ styles.navbar }>
      <ul className={ styles.list}>
        <li className={ styles.listOfLinks}>
          <Link to="/">Home</Link>
        </li>
        <div> 
          <button type="submit" className={styles.button} onClick={signInWithGooglePopup}>
            Sign in to Google
          </button>
          <button type="submit" className={styles.button} onClick={signOutUser}>
            Sign out
          </button>
          {firebaseUser ? (<p>Welcome, {firebaseUser.email}!</p>) : (<p>Please sign in</p>)}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;