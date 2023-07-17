import React, { useState } from "react";
import styles from "./NewPost.module.css";
import { createPost } from "../../../../backend/controllers/post.controller";
import { usePost } from "../../../context/PostProvider";
import { useAuth } from "../../../context/AuthProvider";
import { Folder, Minus, X } from "react-feather";
import { supabase } from "../../../../backend/db/db.connect";
const NewPost = () => {
  const { userLoginDetails } = useAuth();
  const [imgUploaded, setImgUploaded] = useState("");
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

  const deleteImageClickHandler = async () => {
    const { data, error } = await supabase.storage
      .from("posts")
      .remove([imgPreview]);
  };

  const postFileUploadChangeHandler = async (
    e,
    setNewPostDetails,
    userId,
    newPostDetails
  ) => {
    // const postImage = e.target.files[0];
    // const { data, error } = await supabase.storage
    //   .from("posts")
    //   .upload(
    //     `${e.target.files[0]?.name.split(".")[0]}-${userId}.${
    //       e.target.files[0]?.type.split("/")[1]
    //     }`,
    //     postImage
    //   );
    // if (!error) {
    //   const { data: image_url } = await supabase.storage
    //     .from("posts")
    //     .getPublicUrl(data?.path);
    //   postImgUrl: image_url.publicUrl, setImgPreview(image_url.publicUrl);
    //   setNewPostDetails({
    //     ...newPostDetails,
    //     postImgUrl: image_url.publicUrl,
    //   });
    // }
  };
  const newPostFormSubmitHandler = async (e) => {
    e.preventDefault();

    const postImage = e.target[1].files[0];
    const { data, error } = await supabase.storage
      .from("posts")
      .upload(
        `${postImage?.name.split(".")[0]}-${userLoginDetails?.userId}.${
          postImage?.type.split("/")[1]
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

      const { success } = await createPost({
        ...newPostDetails,
        postImgUrl: image_url.publicUrl ?? null,
      });
      if (success) {
        setNewPostDetails({
          userId: userLoginDetails?.userId,
          text: "",
          likes: [],
          comments: [],
          postImgUrl: null,
        });
        setImgUploaded("");
        setPostToggle((prev) => !prev);
      }
    }
  };

  return (
    <form className={styles.newPostWrapper} onSubmit={newPostFormSubmitHandler}>
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
            onChange={() => setImgUploaded("1 file uploaded")}
          />
          <label htmlFor="upload-post" className={styles.uploadPostLabel}>
            <Folder fill="hsl(23, 49%, 35%)" />
          </label>
          {imgUploaded && <small>{imgUploaded}</small>}
        </div>
        <button>post</button>
      </div>
    </form>
  );
};

export default NewPost;
