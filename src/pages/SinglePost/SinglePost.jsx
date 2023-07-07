import React, { useEffect, useState } from "react";
import styles from "./SinglePost.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSinglePost } from "../../../backend/controllers/post.controller";
import { ArrowLeft, Bookmark, Share, ThumbsUp } from "react-feather";
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import CommentCard from "../../components/Card/CommentCard/CommentCard";
import { checkPageLocation } from "../../utils/utls,";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";

const SinglePost = () => {
  const { id } = useParams();
  const location = useLocation();
  const [singlePost, setSinglePost] = useState();
  const navigate = useNavigate();
  const checkPath = checkPageLocation(location.pathname);
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
  const arrowBtnClickHandler = () => {
    navigate("/feed");
  };
  useEffect(() => {
    fetchPostData();
  }, []);
  return (
    <div className={styles.singlePostMainWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <div className={styles.singlePostWrapper}>
        <ArrowLeft onClick={arrowBtnClickHandler} />
        <div>
          <header className={styles.singlePostHeader}>
            <figure>
              <img src={singlePost?.profileImg} alt={singlePost?.profileImg} />
            </figure>
            <div className={styles.profileDetails}>
              <h4>{singlePost?.name}</h4>
              <small>{singlePost?.username}</small>
            </div>
            <small>{new Date(singlePost?.created_at).toLocaleString()}</small>
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
            <AddCommentForm postId={id} setSinglePost={setSinglePost} />
            <div className={styles.singlePostCommentWrapper}>
              {singlePost?.comments.map((item) => {
                return <CommentCard comment={item} key={item.id} />;
              })}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
