import React, { useEffect, useState } from "react";
import styles from "./Explore.module.css";
import { useLocation } from "react-router-dom";
import { checkPageLocation } from "../../utils/utls,";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";
import {
  getAllPosts,
  getSuggestProfiles,
} from "../../../backend/controllers/post.controller";
import PostCard from "../../components/Card/PostCard/PostCard";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
const Explore = () => {
  const location = useLocation();
  const checkPath = checkPageLocation(location.pathname);
  const [allPosts, setAllPosts] = useState([]);
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const fetchPosts = async () => {
    try {
      const { data, success } = await getAllPosts();
      const { data: suggestedProfileData } = await getSuggestProfiles();
      if (success) {
        setAllPosts([...data]);
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
    <div className={styles.exploreWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <section className={styles.allPostsWrapper}>
        {allPosts.map((item) => {
          return <PostCard key={item.id} post={item} />;
        })}
      </section>
      <div className={styles.feedMoreOptions}>
        <h2>Suggested profiles</h2>
        {suggestedProfiles?.map((profile) => {
          return <ProfileCard key={profile.id} profile={profile} />;
        })}
      </div>
    </div>
  );
};

export default Explore;
