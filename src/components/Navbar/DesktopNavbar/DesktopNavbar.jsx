import React from "react";
import styles from "./DesktopNavbar.module.css";
import { Bookmark, Home, Search, User } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
const DesktopNavbar = () => {
  const { setUserloginDetails, setLoginStatus } = useAuth();
  const navigate = useNavigate();
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
  const logoutBtnClickHandler = () => {
    navigate("/");
    setLoginStatus(false);
    setUserloginDetails({
      email: null,
      userId: null,
      token: null,
      loggedInProfile: null,
    });
  };

  return (
    <nav className={styles.DesktopNavbarWrapper}>
      <Home color="hsl(23, 49%, 35%)" onClick={homeBtnClickHandler} />
      <Search color="hsl(23, 49%, 35%)" onClick={searchBtnClickHandler} />
      <Bookmark color="hsl(23, 49%, 35%)" onClick={bookmarkBtnClickHandler} />
      <User color="hsl(23, 49%, 35%)" onClick={profileBtnClickHandler} />
      <button className={styles.logoutButton} onClick={logoutBtnClickHandler}>
        logout
      </button>
    </nav>
  );
};

export default DesktopNavbar;
