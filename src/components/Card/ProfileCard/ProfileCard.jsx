import React from "react";
import styles from "./ProfileCard.module.css";
const ProfileCard = ({ profile }) => {
  return (
    <article className={styles.profileCardWrapper}>
      <figure>
        <div className={styles.profileCardPhoto}></div>
      </figure>
      <div className={styles.profileCardDetails}>
        <h3>{profile.firstName + " " + profile.lastName}</h3>
        <button className={styles.profileCardFollowButton}>details</button>
      </div>
    </article>
  );
};

export default ProfileCard;
