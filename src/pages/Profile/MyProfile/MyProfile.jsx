import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import { useAuth } from "../../../context/AuthProvider";
import { getProfile } from "../../../../backend/controllers/profile.controller";
import PostCard from "../../../components/Card/PostCard/PostCard";
import { getPosts } from "../../../../backend/controllers/post.controller";
import EditProfileForm from "../../../components/EditProfileForm/EditProfileForm";
import { usePost } from "../../../context/PostProvider";
import { checkPageLocation } from "../../../utils/utls,";
import { useLocation, useNavigate } from "react-router-dom";
import MobileNavbar from "../../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../../components/Navbar/DesktopNavbar/DesktopNavbar";

const MyProfile = () => {
  const [profileData, setProfileData] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const { userLoginDetails } = useAuth();
  const [showEditForm, setShowEditForm] = useState(false);
  const { postToggle } = usePost();
  const location = useLocation();
  const checkPath = checkPageLocation(location.pathname);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const { data, success } = await getProfile(userLoginDetails?.userId);
      const { data: postData, success: postSuccess } = await getPosts(
        userLoginDetails?.userId
      );

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
  }, [postToggle]);

  const editBtnClickHandler = async (profileId, updatedProfile) => {
    setShowEditForm(true);
  };

  const bookmarkBtnClickHandler = () => {
    navigate("/bookmark");
  };

  return (
    <div className={styles.myProfileWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <div className={styles.profileWrapper}>
        <section className={styles.profileDetails}>
          <figure className={styles.profileDetailsImage}>
            <img src={profileData?.profileImg} alt={profileData?.profileImg} />
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
          <button onClick={() => editBtnClickHandler(profileData.userId)}>
            edit profile
          </button>
          <button onClick={bookmarkBtnClickHandler}>bookmarks</button>
        </div>
        <section className={styles.profilePosts}>
          {profilePosts?.map((post) => {
            return <PostCard key={post?.id} post={post} />;
          })}
        </section>
        {showEditForm && (
          <EditProfileForm
            profile={profileData}
            setShowEditForm={setShowEditForm}
          />
        )}
      </div>
    </div>
  );
};

export default MyProfile;
