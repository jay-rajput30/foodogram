import React from "react";
import styles from "./AddCommentForm.module.css";
import { useAuth } from "../../context/AuthProvider";
import { updateComment } from "../../../backend/controllers/post.controller";

const AddCommentForm = ({ postId, setSinglePost }) => {
  const { userLoginDetails } = useAuth();

  const commentFormSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { success, data } = await updateComment(
        { commentText: e.target[0].value, postId },
        userLoginDetails.loggedInProfile
      );
      if (success) {
        console.log({ data });
        setSinglePost(data);
      }
    } catch (e) {
      console.error({ e });
    }
  };
  return (
    <form
      className={styles.AddCommentFormWrapper}
      onSubmit={commentFormSubmitHandler}
    >
      <textarea placeholder="comment on this post..."></textarea>
      <button type="submit">post</button>
    </form>
  );
};

export default AddCommentForm;
