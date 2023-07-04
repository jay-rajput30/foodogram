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
      <small onClick={() => filterBtnClickHandler("oldest")}>oldest</small>
      <small onClick={() => filterBtnClickHandler("newest")}>newest</small>
      <small onClick={() => filterBtnClickHandler("popular")}>popular</small>
    </div>
  );
};

export default PostFilter;
