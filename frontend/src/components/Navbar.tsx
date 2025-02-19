import React from "react";
import { Link } from "react-router-dom";

import styles from "@/components/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={ styles.navbar }>
      <ul className={ styles.list}>
        <li className={ styles.listOfLinks}>
          <Link to="/">Home</Link>
        </li>
        <li className={ styles.listOfLinks}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;