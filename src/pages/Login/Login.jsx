import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <h1>login page</h1>
      <p>
        click <Link to="/signup">here</Link> to signup
      </p>
    </div>
  );
};

export default Login;
