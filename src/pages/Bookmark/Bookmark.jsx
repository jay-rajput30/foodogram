import React, { useState } from "react";

import styles from "./Bookmark.module.css";
import PostCard from "../../components/Card/PostCard/PostCard";
import { useAuth } from "../../context/AuthProvider";
// import { useBookmark } from "../../context/BookmarkProvider";
const Bookmark = () => {
  // const { bookmark } = useBookmark();
  const { userLoginDetails } = useAuth();

  return (
    <div>
      <div className={styles.bookmarkWrapper}>
        {userLoginDetails?.loggedInProfile?.bookmarks.map((item) => {
          return <PostCard post={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Bookmark;
