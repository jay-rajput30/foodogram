import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className={styles.signUpFormWrapper}
      >
        <div className={styles.signUpFormItem}>
          <label htmlFor="firstName">first name: </label>
          <input
            type="text"
            id="firstName"
            placeholder="enter first name"
            {...register("firstName")}
          />
        </div>
        <div className={styles.signUpFormItem}>
          <label htmlFor="lastName">last name: </label>
          <input
            type="text"
            id="lastName"
            placeholder="enter last name"
            {...register("lastName")}
          />
        </div>

        <div className={styles.signUpFormItem}>
          <label htmlFor="phoneNo">phone: </label>
          <input
            type="phone"
            id="phoneNo"
            placeholder="enter phone number"
            {...register("phoneNo")}
          />
        </div>

        <div className={styles.signUpFormItem}>
          <label htmlFor="email">email: </label>
          <input
            type="email"
            id="email"
            placeholder="enter email"
            {...register("email", { required: "Email id is required" })}
          />
        </div>

        {errors.email && <p>{errors.email?.message}</p>}
        <div className={styles.signUpFormItem}>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            id="password"
            placeholder="enter password"
            {...register("password", {
              required: "password is required",
            })}
          />
        </div>

        {errors.password && <p>{errors.password?.message}</p>}
        <button type="submit">submit</button>
        <Link to="/">login page</Link>
      </form>
    </div>
  );
};

export default SignUp;
