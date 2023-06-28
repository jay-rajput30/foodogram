import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.css";
import { supabase } from "../../../../backend/db/db.connect";
import { Bookmark, MessageSquare, Share, ThumbsUp } from "react-feather";
import { updateLikes } from "../../../../backend/controllers/post.controller";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../../context/PostProvider";

const PostCard = ({ post }) => {
  const { userLoginDetails } = useAuth();
  const navigate = useNavigate();
  const { setPostToggle } = usePost();
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
    const { data, success, error } = await updateLikes(userId, postId);
    console.log({ success, error });
    if (success) {
      setPostToggle((prev) => !prev);
      console.log({ data });
    }
  };

  const postCardClickHandler = (profileId) => {
    console.log("post card click handler called");
    navigate(`/profile/${profileId}`);
  };

  return (
    <article className={styles.postCardWrapper}>
      <div className={styles.postCardHeader}>
        <figure className={styles.postCardProfilePhoto}>
          <img src={post.profileImg} alt={post.profileImg} />
        </figure>
        <div className={styles.postCardProfileHeaderDetails}>
          <h4 onClick={() => postCardClickHandler(post.userId)}>{post.name}</h4>
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
          {post.likes?.length}
        </span>
        <MessageSquare />
        <Bookmark />
      </div>
    </article>
  );
};

export default PostCard;
