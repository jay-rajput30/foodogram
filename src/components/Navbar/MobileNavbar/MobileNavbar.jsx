import React from "react";
import styles from "./MobileNavbar.module.css";
import { Bookmark, Home, LogOut, Search, User } from "react-feather";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthProvider";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const { setUserloginDetails, loginStatus, setLoginStatus } = useAuth();
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
    <nav className={styles.mobileNavbarWrapper}>
      <Home color="hsl(23, 49%, 35%)" onClick={homeBtnClickHandler} />
      <Search color="hsl(23, 49%, 35%)" onClick={searchBtnClickHandler} />
      <Bookmark color="hsl(23, 49%, 35%)" onClick={bookmarkBtnClickHandler} />
      <User color="hsl(23, 49%, 35%)" onClick={profileBtnClickHandler} />
      {loginStatus && (
        <LogOut color="hsl(23, 49%, 35%)" onClick={logoutBtnClickHandler} />
      )}
    </nav>
  );
};

export default MobileNavbar;
