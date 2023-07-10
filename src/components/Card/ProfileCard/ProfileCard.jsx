import React from "react";
import styles from "./ProfileCard.module.css";
import { useNavigate } from "react-router-dom";
const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();
  const detailsBtnClickHandler = () => {
    navigate(`/profile/${profile.userId}`);
  };
  console.log({ profile });
  return (
    <article className={styles.profileCardWrapper}>
      <figure>
        <img className={styles.profileCardPhoto} src={profile.profileImg} />
      </figure>
      <div className={styles.profileCardDetails}>
        <h4>{profile.username}</h4>
        <button
          className={styles.profileCardFollowButton}
          onClick={detailsBtnClickHandler}
        >
          details
        </button>
      </div>
    </article>
  );
};

export default ProfileCard;
