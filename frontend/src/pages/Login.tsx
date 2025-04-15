// filepath: /c:/Users/maxim/Desktop/wi25-hack-team-1/frontend/src/pages/Login.tsx
import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

// login page component
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className={styles.container}>
      <h1>Login to Rydeshare</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.registerText}>
          If you don't have an account,{" "}
          <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
