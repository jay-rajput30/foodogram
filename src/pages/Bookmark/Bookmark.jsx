import React, { useEffect, useState } from "react";

import styles from "./Bookmark.module.css";
import PostCard from "../../components/Card/PostCard/PostCard";
import { useAuth } from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";
import { checkPageLocation } from "../../utils/utls,";
import { getSuggestProfiles } from "../../../backend/controllers/post.controller";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";

const Bookmark = () => {
  const { userLoginDetails } = useAuth();
  const location = useLocation();
  const checkPath = checkPageLocation(location.pathname);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const fetchPosts = async () => {
    try {
      const { data: suggestedProfileData, success } =
        await getSuggestProfiles();
      if (success) {
        setSuggestedProfiles(suggestedProfileData);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className={styles.bookmarkWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <div className={styles.bookmarkPostsWrapper}>
        {userLoginDetails?.loggedInProfile?.bookmarks.length === 0 ? (
          <p className={styles.emptyBookmarkText}>please bookmark some posts</p>
        ) : (
          userLoginDetails?.loggedInProfile?.bookmarks.map((item) => {
            return <PostCard post={item} key={item.id} />;
          })
        )}
      </div>
      <div className={styles.feedMoreOptions}>
        <h2>Suggested profiles</h2>
        {suggestedProfiles?.map((profile) => {
          return <ProfileCard key={profile.id} profile={profile} />;
        })}
      </div>
    </div>
  );
};

export default Bookmark;
