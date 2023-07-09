import React from "react";
import styles from "./ProfileCard.module.css";
const ProfileCard = ({ profile }) => {
  return (
    <article className={styles.profileCardWrapper}>
      <figure>
        <img className={styles.profileCardPhoto} src={profile.profileImg} />
      </figure>
      <div className={styles.profileCardDetails}>
        <h4>{profile.username}</h4>
        <button className={styles.profileCardFollowButton}>details</button>
      </div>
    </article>
  );
};

export default ProfileCard;
