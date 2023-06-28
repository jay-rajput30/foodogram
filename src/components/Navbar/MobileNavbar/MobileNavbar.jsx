import React from "react";
import styles from "./MobileNavbar.module.css";
import { Bookmark, Home, Search, User } from "react-feather";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthProvider";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const { userLoginDetails } = useAuth();
  const homeBtnClickHandler = () => {
    navigate("/feed");
  };

  const searchBtnClickHandler = () => {
    navigate("/explore");
  };

  const bookmarkBtnClickHandler = () => {
    navigate("/bookmark");
  };

  const profileBtnClickHandler = () => {
    navigate(`/profile`);
  };
  return (
    <nav className={styles.mobileNavbarWrapper}>
      <Home color="hsl(23, 49%, 35%)" onClick={homeBtnClickHandler} />
      <Search color="hsl(23, 49%, 35%)" onClick={searchBtnClickHandler} />
      <Bookmark color="hsl(23, 49%, 35%)" onClick={bookmarkBtnClickHandler} />
      <User color="hsl(23, 49%, 35%)" onClick={profileBtnClickHandler} />
    </nav>
  );
};

export default MobileNavbar;
