import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  followUser,
  getProfile,
} from "../../../backend/controllers/profile.controller";
import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthProvider";
import { getPosts } from "../../../backend/controllers/post.controller";
import PostCard from "../../components/Card/PostCard/PostCard";
import { checkPageLocation } from "../../utils/utls,";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const { userLoginDetails, profileToggle, setProfileToggle } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const checkPath = checkPageLocation(location.pathname);
  const fetchProfile = async () => {
    try {
      const { data, success } = await getProfile(id);
      const { data: postData, success: postSuccess } = await getPosts(id);
      if (success && postSuccess) {
        setProfileData(data);
        setProfilePosts(postData);
      }
    } catch (e) {
      console.error({ e });
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [profileToggle]);

  const followBtnClickHandler = async () => {
    try {
      const { data, success } = await followUser(
        userLoginDetails?.loggedInProfile,
        profileData
      );
      setProfileToggle((prev) => !prev);
      if (success) {
        setProfileToggle((prev) => !prev);
      }
    } catch (e) {
      console.error({ error: e });
    }
  };
  if (!profileData && !profilePosts) {
    return <p>loading data...</p>;
  }

  return (
    <div className={styles.profileWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <section className={styles.profileDetails}>
        <figure className={styles.profileDetailsImage}>
          <img src={profileData.profileImg} />
        </figure>
        <div>
          <h2>{profileData?.firstName + " " + profileData?.lastName}</h2>
          <div className={styles.profileButtonWrapper}>
            <button onClick={followBtnClickHandler}>
              {profileData.followers?.some(
                (item) => item.userId === userLoginDetails.userId
              )
                ? "unfollow"
                : "follow"}
              {/* follow */}
            </button>
          </div>
        </div>
      </section>
      <p>{profileData?.bio}</p>
      <div className={styles.profileDetailsFollowerWrapper}>
        <div>
          <h4>followers</h4>
          <p>{profileData?.followers?.length}</p>
        </div>
        <div>
          <h4>following</h4>
          <p>{profileData?.following?.length}</p>
        </div>
      </div>
      <section className={styles.profilePosts}>
        {profilePosts?.map((post) => {
          return <PostCard key={post?.id} post={post} />;
        })}
      </section>
    </div>
  );
};

export default Profile;
