import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.css";
import { supabase } from "../../../../backend/db/db.connect";
import { MessageSquare, Share, ThumbsUp } from "react-feather";
import { updateLikes } from "../../../../backend/controllers/post.controller";
import { useAuth } from "../../../context/AuthProvider";

const PostCard = ({ post }) => {
  const { userLoginDetails } = useAuth();
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

  const likeBtnClickHandler = async (userId, postId) => {
    console.log("click handler called");
    const { data, success } = await updateLikes(userId, postId);
    if (success) {
      console.log({ data });
    }
  };

  return (
    <article className={styles.postCardWrapper}>
      <div className={styles.postCardHeader}>
        <div className={styles.postCardProfilePhoto}></div>
        <div className={styles.postCardProfileHeaderDetails}>
          <h4>your name</h4>
          <small>12-06-2023</small>
        </div>
      </div>
      <div className={styles.postCardBody}>
        <p>{post?.text}</p>
        {post?.postImgUrl && (
          <figure>
            <img src={post?.postImgUrl} alt={post?.postImgUrl} />
          </figure>
        )}
      </div>
      <div className={styles.postCardUserActionsWrapper}>
        <span>
          <ThumbsUp
            onClick={() =>
              likeBtnClickHandler(userLoginDetails?.userId, post?.id)
            }
          />
          {post.likes.length}
        </span>
        <MessageSquare />
        <Share />
      </div>
    </article>
  );
};

export default PostCard;
