import React, { useState } from "react";
import styles from "./NewPost.module.css";
import { createPost } from "../../../../backend/controllers/post.controller";
import { usePost } from "../../../context/PostProvider";
import { useAuth } from "../../../context/AuthProvider";
import { Folder } from "react-feather";
import { supabase } from "../../../../backend/db/db.connect";
const NewPost = () => {
  const { userLoginDetails } = useAuth();
  const [newPostDetails, setNewPostDetails] = useState({
    userId: userLoginDetails?.userId,
    text: "",
    likes: [],
    comments: [],
    postImgUrl: null,
  });
  const { setPostToggle } = usePost();

  const postBtnClickHandler = async () => {
    if (newPostDetails) {
      const { success } = await createPost(newPostDetails);
      if (success) {
        setNewPostDetails({
          userId: userLoginDetails?.userId,
          text: "",
          likes: [],
          comments: [],
          postImgUrl: null,
        });
        setPostToggle((prev) => !prev);
      }
    }
  };

  const postFileUploadChangeHandler = async (
    e,
    setNewPostDetails,
    userId,
    newPostDetails
  ) => {
    const postImage = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("posts")
      .upload(
        `${e.target.files[0]?.name.split(".")[0]}-${userId}.${
          e.target.files[0]?.type.split("/")[1]
        }`,
        postImage
      );
    if (!error) {
      const { data: image_url } = await supabase.storage
        .from("posts")
        .getPublicUrl(data?.path);
      setNewPostDetails({
        ...newPostDetails,
        postImgUrl: image_url.publicUrl,
      });
    }
  };

  return (
    <article className={styles.newPostWrapper}>
      <textarea
        placeholder="any meal recommendations?"
        onChange={(e) =>
          setNewPostDetails({ ...newPostDetails, text: e.target.value })
        }
        value={newPostDetails.text}
      ></textarea>
      <div className={styles.newPostUploadOptions}>
        <div>
          <input
            type="file"
            id="upload-post"
            onChange={(e) =>
              postFileUploadChangeHandler(
                e,
                setNewPostDetails,
                userLoginDetails?.userId,
                newPostDetails
              )
            }
          />
          <label htmlFor="upload-post">
            <Folder fill="hsl(23, 49%, 35%)" />
          </label>
        </div>
        <button onClick={postBtnClickHandler}>post</button>
      </div>
    </article>
  );
};

export default NewPost;
