import React, { useState } from "react";
import styles from "./EditPost.module.css";
import { updatePost } from "../../../backend/controllers/post.controller";
import { usePost } from "../../context/PostProvider";
const EditPost = ({ post }) => {
  const [editFormData, setEditFormData] = useState({
    text: post.text,
    postImg: post.postImgUrl,
  });
  const { postToggle } = usePost();
  const editFormSubmitHandler = async (e) => {
    e.preventDefault();
    const { data, success } = await updatePost(post.id, editFormData.text);
    if (success) {
      postToggle((prev) => !prev);
    }
  };
  return (
    <form className={styles.editFormWrapper} onSubmit={editFormSubmitHandler}>
      <label>
        <input
          type="text"
          value={editFormData.text}
          onChange={(e) =>
            setEditFormData({ ...editFormData, text: e.target.value })
          }
        />
      </label>
      {editFormData.postImg && (
        <figure>
          <img src={editFormData.text} alt={editFormData.postImg} />
        </figure>
      )}
      <button>submit</button>
    </form>
  );
};

export default EditPost;
