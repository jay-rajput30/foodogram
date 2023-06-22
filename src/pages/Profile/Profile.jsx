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

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const { userLoginDetails } = useAuth();
  const { id } = useParams();
  const fetchProfile = async () => {
    try {
      const { data, success } = await getProfile(id);
      const { data: postData, success: postSuccess } = await getPosts(id);
      if (success && postSuccess) {
        console.log({ data, postData });
        setProfileData(data);
        setProfilePosts(postData);
      }
    } catch (e) {
      console.error({ e });
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const followBtnClickHandler = async () => {
    const { data, success } = await followUser(
      userLoginDetails?.loggedInProfile,
      profileData
    );
    console.log({ data, success });
  };
  return (
    <div className={styles.profileWrapper}>
      <section className={styles.profileDetails}>
        <figure className={styles.profileDetailsImage}>
          <div></div>
        </figure>
        <div>
          <h2>{profileData?.firstName + " " + profileData?.lastName}</h2>
          <div className={styles.profileButtonWrapper}>
            <button onClick={followBtnClickHandler}>follow</button>
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
