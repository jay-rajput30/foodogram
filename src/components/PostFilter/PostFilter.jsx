import React from "react";
import styles from "./PostFilter.module.css";
import { usePost } from "../../context/PostProvider";

const PostFilter = () => {
  const { setPostFilterOption } = usePost();
  const filterBtnClickHandler = (item) => {
    setPostFilterOption(item);
  };
  return (
    <div className={styles.postFilterWrapper}>
      <small>Sort options </small>
      <div>
        <button onClick={() => filterBtnClickHandler("oldest")}>oldest</button>
        <button onClick={() => filterBtnClickHandler("newest")}>newest</button>
        <button onClick={() => filterBtnClickHandler("popular")}>
          popular
        </button>
      </div>
    </div>
  );
};

export default PostFilter;
