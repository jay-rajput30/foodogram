import React from "react";
import styles from "./PostCard.module.css";
import { supabase } from "../../../../backend/db/db.connect";
import { Bookmark, MessageSquare, Share, ThumbsUp } from "react-feather";
import { updateLikes } from "../../../../backend/controllers/post.controller";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../../context/PostProvider";
import { useBookmark } from "../../../context/BookmarkProvider";

const PostCard = ({ post }) => {
  const { userLoginDetails } = useAuth();
  const navigate = useNavigate();
  const { setPostToggle } = usePost();
  const { bookmarkBtnClickHandler } = useBookmark();

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
    if (success) {
      setPostToggle((prev) => !prev);
    }
  };
  const dateFormat = new Date(post.created_at);
  const postCardClickHandler = (profileId) => {
    navigate(`/profile/${profileId}`);
    if (userLoginDetails.userId === profileId) {
      navigate("/profile");
    }
  };

  const bookmarkItemFound = userLoginDetails?.loggedInProfile?.bookmarks.some(
    (item) => item.id === post.id
  );
  const commentBtnClickHandler = () => {
    navigate(`/post/${post.id}`);
  };
  const userFound = post.likes.find(
    (like) => like.userId === userLoginDetails.userId
  );

  console.log;
  return (
    <article className={styles.postCardWrapper}>
      <div className={styles.postCardHeader}>
        <figure className={styles.postCardProfilePhoto}>
          <img src={post.profileImg} alt={post.profileImg} />
        </figure>
        <div className={styles.postCardProfileHeaderDetails}>
          <h4 onClick={() => postCardClickHandler(post.userId)}>{post.name}</h4>
          <small>
            {dateFormat.toLocaleDateString() +
              " " +
              dateFormat.toLocaleTimeString()}
          </small>
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
            size="20"
            onClick={() =>
              likeBtnClickHandler(userLoginDetails?.userId, post?.id)
            }
            fill={`${userFound ? "hsl(23, 49%, 35%)" : "whitesmoke"}`}
          />
          {post.likes?.length}
        </span>
        <MessageSquare
          color="hsl(23, 93%, 76%)"
          size="20"
          onClick={commentBtnClickHandler}
        />
        <Bookmark
          size="20"
          onClick={() => bookmarkBtnClickHandler(post)}
          fill={`${
            bookmarkItemFound ? "hsl(23, 49%, 35%)" : "hsl(30, 20%, 96%)"
          }`}
        />
      </div>
    </article>
  );
};

export default PostCard;
