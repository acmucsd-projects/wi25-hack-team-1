import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { signOutUser, signInWithGooglePopup } from "@/firebase/auth_google";
import { UserContext } from "@/firebase/UserContext";
import styles from "@/components/Navbar.module.css";
import googleLogo from "@/assets/google-icon.svg"; // Adjust the path as necessary
import { MdLogout } from "react-icons/md";

const Navbar: React.FC = () => {
  const { firebaseUser } = useContext(UserContext);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <div className={styles.list_right}>
        {firebaseUser ? (
          <div className={styles.loginContainer}>
            <button
              type="button"
              className={styles.logOutButton}
              onClick={signOutUser}
            >
              <MdLogout size={30} />
            </button>
          </div>
        ) : (
          <div className={styles.loginContainer}>
            <button
              type="button"
              className={styles.googleButton}
              onClick={signInWithGooglePopup}
            >
              <img src={googleLogo} alt="Google logo" width="20" height="20" />
              Sign in to Google
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
