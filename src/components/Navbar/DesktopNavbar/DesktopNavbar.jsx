import React from "react";
import styles from "./DesktopNavbar.module.css";
import { Bookmark, Home, Search, User } from "react-feather";
const DesktopNavbar = () => {
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
    <nav className={styles.DesktopNavbarWrapper}>
      <Home color="hsl(23, 49%, 35%)" onClick={homeBtnClickHandler} />
      <Search color="hsl(23, 49%, 35%)" onClick={searchBtnClickHandler} />
      <Bookmark color="hsl(23, 49%, 35%)" onClick={bookmarkBtnClickHandler} />
      <User color="hsl(23, 49%, 35%)" onClick={profileBtnClickHandler} />
      <button>logout</button>
    </nav>
  );
};

export default DesktopNavbar;
