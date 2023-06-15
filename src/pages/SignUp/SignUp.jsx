import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpUser } from "../../../backend/controllers/login.controller";
import styles from "./SignUp.module.css";
const SignUp = () => {
  const [signupData, setSignupData] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = async (formData) => {
    setSignupData(formData);
    try {
      const { data, success, error } = await signUpUser({
        email: formData?.email,
        password: formData?.password,
        firstName: formData.firstName,
        lastName: formData?.lastName,
      });
      if (success) {
        navigate("/");
        // console.log({ dataFE: data });
        // localStorage.setItem(
        //   "loggedinUser",
        //   JSON.stringify({
        //     token: data?.session.sccess_token,
        //     userId: data?.user.id,
        //   })
        // );
      }
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const cancelBtnClickHandler = () => {
    navigate("/");
  };
  return (
    <div className={styles.signUpWrapper}>
      <h1>sign up</h1>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className={styles.signUpFormWrapper}
      >
        <div className={styles.signUpFormItem}>
          <label htmlFor="firstName">first name: </label>
          <input
            type="text"
            id="firstName"
            placeholder="first name"
            {...register("firstName")}
          />
        </div>
        <div className={styles.signUpFormItem}>
          <label htmlFor="lastName">last name: </label>
          <input
            type="text"
            id="lastName"
            placeholder="last name"
            {...register("lastName")}
          />
        </div>

        <div className={styles.signUpFormItem}>
          <label htmlFor="phoneNo">phone: </label>
          <input
            type="phone"
            id="phoneNo"
            placeholder="phone number"
            {...register("phoneNo")}
          />
        </div>

        <div className={styles.signUpFormItem}>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            id="email"
            placeholder="email"
            {...register("email", { required: "Email id is required" })}
          />
        </div>

        {errors.email && <p>{errors.email?.message}</p>}
        <div className={styles.signUpFormItem}>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            {...register("password", {
              required: "password is required",
            })}
          />
        </div>

        {errors.password && <p>{errors.password?.message}</p>}
        <button type="submit">submit</button>
        <NavLink to="/login">login page</NavLink>
      </form>
    </div>
  );
};

export default SignUp;
