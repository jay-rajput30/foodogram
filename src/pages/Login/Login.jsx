import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  const formSubmitHandler = (loginData) => {
    console.log({ loginData });
  };

  return (
    <div className={styles.loginWrapper}>
      <h1>login page</h1>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className={styles.loginFormWrapper}
      >
        <div className={styles.loginFormItem}>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            {...register("email")}
          />
        </div>
        <div className={styles.loginFormItem}>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
