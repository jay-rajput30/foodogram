import React from "react";
import styles from "./CommentCard.module.css";
const CommentCard = ({ comment }) => {
  return (
    <article className={styles.commentCardWrapper}>
      <div className={styles.commentCardHeader}>
        <figure>
          <img src={comment.profileImg} />
        </figure>
        <div className={styles.commentCardDetails}>
          <h3>{comment.name}</h3>
          <small>{comment.username}</small>
        </div>
        <small className={styles.commentCardTime}>
          {new Date(comment.created_at).toLocaleString()}
        </small>
      </div>
      <div className={styles.commentCardBody}>
        <p>{comment.commentText}</p>
      </div>
    </article>
  );
};

export default CommentCard;
