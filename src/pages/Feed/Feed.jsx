import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import { useLocation } from "react-router";
import { checkPageLocation } from "../../utils/utls,";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";
import { useAuth } from "../../context/AuthProvider";
import { supabase } from "../../../backend/db/db.connect";
import { usePost } from "../../context/PostProvider";
import NewPost from "./NewPost/NewPost";
import PostCard from "../../components/Card/PostCard/PostCard";

const Feed = () => {
  const location = useLocation();
  const { userLoginDetails } = useAuth();
  const { userPosts, setUserPost, postToggle, setAllPosts } = usePost();

  const checkPath = checkPageLocation(location.pathname);

  const fetchPosts = async () => {
    try {
      const { data: allPostsData, allPostsError } = await supabase
        .from("posts")
        .select("*");
      const { data, error } = await supabase
        .from("profile")
        .select()
        .eq("userId", userLoginDetails?.userId);

      const { data: postData, postError } = await supabase
        .from("posts")
        .select()
        .in("userId", [...data[0].following, userLoginDetails?.userId]);
      if (!postError && !error && !allPostsError) {
        setUserPost(postData);
        setAllPosts(allPostsData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [postToggle]);

  return (
    <div className={styles.feedWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <section className={styles.postsWrapper}>
        <NewPost />
        <div className={styles.userPostsWrapper}>
          {userPosts.map((item) => {
            return <PostCard key={item.id} post={item} />;
          })}
        </div>
      </section>
      <div className={styles.feedMoreOptions}></div>
    </div>
  );
};

export default Feed;
