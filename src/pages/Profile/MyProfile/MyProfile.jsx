import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import { useAuth } from "../../../context/AuthProvider";
import { getProfile } from "../../../../backend/controllers/profile.controller";
import PostCard from "../../../components/Card/PostCard/PostCard";
import { getPosts } from "../../../../backend/controllers/post.controller";

const MyProfile = () => {
  const [profileData, setProfileData] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const { userLoginDetails } = useAuth();
  console.log({ userId: userLoginDetails?.userId });
  const fetchProfile = async () => {
    try {
      const { data, success } = await getProfile(userLoginDetails?.userId);
      const { data: postData, success: postSuccess } = await getPosts(
        userLoginDetails?.userId
      );
      console.log({ data, postData });
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
  }, []);

  return (
    <div className={styles.profileWrapper}>
      <section className={styles.profileDetails}>
        <figure className={styles.profileDetailsImage}>
          <div></div>
        </figure>
        <div>
          <h2>{profileData?.firstName + " " + profileData?.lastName}</h2>
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
        </div>
      </section>
      <p>{profileData?.bio}</p>
      <div className={styles.profileButtonWrapper}>
        <button>edit profile</button>
        <button>bookmarks</button>
      </div>
      <section className={styles.profilePosts}>
        {profilePosts?.map((post) => {
          return <PostCard key={post?.id} post={post} />;
        })}
      </section>
    </div>
  );
};

export default MyProfile;
