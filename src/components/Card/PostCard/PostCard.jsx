import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.css";
import { supabase } from "../../../../backend/db/db.connect";

const PostCard = ({ post }) => {
  const [postImg, setPostImg] = useState("");

  const fetchImage = () => {
    try {
      const { data, error } = supabase.storage
        .from("posts")
        .getPublicUrl(fileName);
      if (!error) {
        setPostImg(data.publicUrl);
      }
    } catch (e) {
      console.error({ error: e });
    }
  };

  return (
    <article className={styles.postCardWrapper}>
      <div className={styles.postCardHeader}>
        <div className={styles.postCardProfilePhoto}></div>
        <div className={styles.postCardProfileHeaderDetails}>
          <h3>your name</h3>
          <small>12-06-2023</small>
        </div>
      </div>
      <div className={styles.postCardBody}>
        <p>{post?.text}</p>
        {post.postImgUrl && (
          <img src={post?.postImgUrl} alt={post?.postImgUrl} />
        )}
      </div>
    </article>
  );
};

export default PostCard;
