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
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import { getSuggestProfiles } from "../../../backend/controllers/post.controller";
import PostFilter from "../../components/PostFilter/PostFilter";

const Feed = () => {
  const location = useLocation();
  const { userLoginDetails } = useAuth();
  const {
    userPosts,
    setUserPost,
    setPostToggle,
    allPosts,
    setAllPosts,
    postFilterOption,
    setPostFilterOption,
  } = usePost();
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const checkPath = checkPageLocation(location.pathname);

  const fetchPosts = async () => {
    try {
      // const { data: allPostsData, allPostsError } = await supabase
      //   .from("posts")
      //   .select("*");

      // const { data, error } = await supabase
      //   .from("profile")
      //   .select()
      //   .eq("userId", userLoginDetails?.userId);

      // const { data: postData, postError } = await supabase
      //   .from("posts")
      //   .select()
      //   .in("userId", [...data[0].following, userLoginDetails?.userId]);

      const { data: suggestedProfileData, success } =
        await getSuggestProfiles();

      if (success) {
        // setUserPost(postData[0]);
        // setAllPosts(allPostsData[0]);
        setSuggestedProfiles(suggestedProfileData);
        setPostToggle((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const getSortedData = (data, filterOptions) => {
    switch (filterOptions) {
      case "oldest":
        return [...data].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      case "newest":
        return [...data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "popular":
        return [...data].sort((a, b) => b.likes.length - a.likes.length);
      default:
        return data;
    }
  };
  const sortedData = getSortedData(allPosts, postFilterOption);
  console.log({ sortedData });
  return (
    <div className={styles.feedWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <section className={styles.postsWrapper}>
        <NewPost />
        <PostFilter />
        <div className={styles.userPostsWrapper}>
          {sortedData?.map((item) => {
            return <PostCard key={item.id} post={item} />;
          })}
        </div>
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

export default Feed;
