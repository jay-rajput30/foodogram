import React, { useState } from "react";

import styles from "./Bookmark.module.css";
import PostCard from "../../components/Card/PostCard/PostCard";
import { useAuth } from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";
import { checkPageLocation } from "../../utils/utls,";

const Bookmark = () => {
  const { userLoginDetails } = useAuth();
  const location = useLocation();
  const checkPath = checkPageLocation(location.pathname);
  return (
    <div className={styles.bookmarkWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <div>
        {userLoginDetails?.loggedInProfile?.bookmarks.map((item) => {
          return <PostCard post={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Bookmark;
