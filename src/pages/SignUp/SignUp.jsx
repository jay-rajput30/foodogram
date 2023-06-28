import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../../backend/controllers/login.controller";
import styles from "./SignUp.module.css";
import { supabase } from "../../../backend/db/db.connect";
import { getAvatar } from "../../utils/utls,";
const SignUp = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    profileImg: "",
  });
  const navigate = useNavigate();
  const [validUsername, setValidUsername] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // fetchAvatars();
  }, []);

  const formSubmitHandler = async (formData) => {
    setValidUsername(true);
    setSignupData({ ...signupData, ...formData });
    try {
      const { data: usernameData, usernameError } = await supabase
        .from("profile")
        .select("*")
        .eq("username", formData.username);
      console.log({ usernameData });
      if (usernameData[0]) {
        console.log("username exists");
        setValidUsername(false);
        return;
      }

      setValidUsername(true);
      console.log("username does not exists");
      const { data, success } = await signUpUser({
        email: formData?.email,
        password: formData?.password,
        firstName: formData.firstName,
        lastName: formData?.lastName,
        username: formData.username,
        profileImg: getAvatar(),
      });
      if (success) {
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log(errors);
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
            {...register("email", {
              required: "Email id is required",
            })}
          />
        </div>
        <p>{errors.email?.email}</p>
        <div className={styles.signUpFormItem}>
          <label htmlFor="email">username: </label>
          <input
            type="text"
            id="username"
            placeholder="enter username"
            {...register("username", {
              required: "username id is required",
              validate: () => validUsername || "username already exists",
            })}
          />
        </div>
        {errors.username && (
          <span className={styles.usernameErrorMessage}>
            {errors.username?.message}
          </span>
        )}
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
