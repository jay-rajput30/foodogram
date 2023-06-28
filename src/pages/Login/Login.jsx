import React from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getLoginCredentials } from "../../../backend/controllers/login.controller";
import { useAuth } from "../../context/AuthProvider";
import { usePost } from "../../context/PostProvider";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setPostToggle } = usePost();
  const navigate = useNavigate();
  const { updateUserLoginDetails } = useAuth();
  const formSubmitHandler = async (loginData) => {
    try {
      const { success, data } = await getLoginCredentials({
        email: loginData.email,
        password: loginData.password,
      });
      if (success) {
        updateUserLoginDetails(data);
        setPostToggle((prev) => !prev);
        navigate("/feed");
      }
    } catch (e) {
      console.error({ error: e });
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className={styles.loginFormWrapper}
      >
        <div className={styles.loginFormItem}>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            id="email"
            placeholder="enter email"
            {...register("email", { required: "email is required" })}
          />
        </div>
        {errors.email && (
          <p className={styles.loginErrorMessage}>{errors.email?.message}</p>
        )}
        <div className={styles.loginFormItem}>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            id="password"
            placeholder="enter password"
            {...register("password", { required: "password is required" })}
          />
        </div>
        {errors.password && (
          <p className={styles.loginErrorMessage}>{errors.password?.message}</p>
        )}
        <button type="submit">login</button>
        <p className={styles.signUpText}>
          click <Link to="/signup">here</Link> to sign up
        </p>
      </form>
    </div>
  );
};

export default Login;
