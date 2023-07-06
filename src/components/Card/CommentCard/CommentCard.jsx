import React from "react";
import styles from "./CommentCard.module.css";
import { useAuth } from "../../../context/AuthProvider";
import { updateComment } from "../../../../backend/controllers/post.controller";

const CommentCard = ({ postId }) => {
  const { userLoginDetails } = useAuth();

  const commentFormSubmitHandler = async (e) => {
    console.log(e.target[0].value);
    try {
      e.preventDefault();
      const { success, data } = await updateComment(
        { commentText: e.target[0], postId },
        userLoginDetails.loggedInProfile
      );
    } catch (e) {
      console.error({ e });
    }
  };
  return (
    <form
      className={styles.commentCardWrapper}
      onSubmit={commentFormSubmitHandler}
    >
      <textarea placeholder="comment on this post..."></textarea>
      <button type="submit">post</button>
    </form>
  );
};

export default CommentCard;
