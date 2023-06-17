import React, { useState } from "react";
import styles from "./Feed.module.css";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import { useLocation } from "react-router";
import { checkPageLocation } from "../../utils/utls,";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";
import { Folder } from "react-feather";
import { useAuth } from "../../context/AuthProvider";
import { createPost } from "../../../backend/controllers/post.controller";
import { supabase } from "../../../backend/db/db.connect";
import { postFileUploadChangeHandler } from "./Feed.helpers";
import { usePost } from "../../context/PostProvider";

const Feed = () => {
  const location = useLocation();
  const { userLoginDetails } = useAuth();
  const { userPosts, setPostToggle } = usePost();
  const [newPostDetails, setNewPostDetails] = useState({
    userId: userLoginDetails?.userId,
    text: "",
    likes: [],
    comments: [],
    postImgUrl: null,
  });
  const checkPath = checkPageLocation(location.pathname);

  const postBtnClickHandler = async () => {
    if (newPostDetails) {
      const { success, data } = await createPost(newPostDetails);
      if (success) {
        console.log({ feedData: data });
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
  console.log({ userPosts });

  return (
    <div className={styles.feedWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <section className={styles.postsWrapper}>
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
                  postFileUploadChangeHandler(e, setNewPostDetails)
                }
              />
              <label htmlFor="upload-post">
                <Folder fill="hsl(23, 49%, 35%)" />
              </label>
            </div>
            <button onClick={postBtnClickHandler}>post</button>
          </div>
        </article>
      </section>
      <div className={styles.feedMoreOptions}></div>
    </div>
  );
};

export default Feed;
