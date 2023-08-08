import React, { useState } from "react";
import styles from "./EditPost.module.css";
import { useAuth } from "../../../context/AuthProvider";
import { usePost } from "../../../context/PostProvider";
import { updatePost } from "../../../../backend/controllers/post.controller";
const EditPost = ({ post, setShowEditPostForm }) => {
  const { userLoginDetails } = useAuth();
  const { setPostToggle } = usePost();
  const [postText, setPostText] = useState(post.text);
  const editPostFormSubmitHandler = async (e) => {
    if (postText) {
      const { success } = await updatePost(
        { ...post, text: postText },
        userLoginDetails?.userId
      );
      if (success) {
        setPostToggle((prev) => !prev);
        setShowEditPostForm(false);
      }
    }
  };
  return (
    <form onSubmit={editPostFormSubmitHandler}>
      <textarea
        placeholder={post.text}
        onChange={(e) => setPostText(e.target.value)}
        value={post.text}
      ></textarea>
      <button type="submit">edit</button>
    </form>
  );
};

export default EditPost;
