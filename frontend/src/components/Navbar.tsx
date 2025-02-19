import React from "react";
import { Link } from "react-router-dom";

import styles from "@/components/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={ styles.navbar }>
      <ul className={ styles.list}>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li className={ styles.button }>
          <button onClick={() => alert('Button clicked!')}>Google Authentication</button>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;