import React, { useEffect, useState } from "react";
import styles from "./SinglePost.module.css";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../../backend/controllers/post.controller";
const SinglePost = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState();
  const fetchPostData = async () => {
    try {
      const { data, success } = await getSinglePost(id);

      if (success) {
        setSinglePost(data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);
  return (
    <div className={styles.singlePostWrapper}>
      <div className={styles.singlePostHeader}></div>
    </div>
  );
};

export default SinglePost;
