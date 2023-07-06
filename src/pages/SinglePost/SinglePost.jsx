import React, { useEffect, useState } from "react";
import styles from "./SinglePost.module.css";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../../backend/controllers/post.controller";
import { Bookmark, Share, ThumbsUp } from "react-feather";
import CommentCard from "../../components/Card/CommentCard/CommentCard";

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
      <header className={styles.singlePostHeader}>
        <figure>
          <img src={singlePost?.profileImg} alt={singlePost?.profileImg} />
        </figure>
        <div className={styles.profileDetails}>
          <h4>{singlePost?.name}</h4>
          <small>{singlePost?.username}</small>
        </div>
      </header>
      <main className={styles.singlePostMain}>
        <p>{singlePost?.text}</p>
      </main>
      <footer className={styles.singlePostFooter}>
        <div>
          <ThumbsUp color="var(--color-primary-300)" />
          <Bookmark color="var(--color-primary-300)" />
          <Share color="var(--color-primary-300)" />
        </div>
        <CommentCard postId={id} />
      </footer>
    </div>
  );
};

export default SinglePost;
