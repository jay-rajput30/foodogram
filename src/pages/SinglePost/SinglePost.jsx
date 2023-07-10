import React, { useEffect, useState } from "react";
import styles from "./SinglePost.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getSinglePost,
  updateLikes,
} from "../../../backend/controllers/post.controller";
import { ArrowLeft, Bookmark, Share, ThumbsUp } from "react-feather";
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import CommentCard from "../../components/Card/CommentCard/CommentCard";
import { checkPageLocation } from "../../utils/utls,";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";
import { useAuth } from "../../context/AuthProvider";
import { usePost } from "../../context/PostProvider";
import { useBookmark } from "../../context/BookmarkProvider";

const SinglePost = () => {
  const { id } = useParams();
  const location = useLocation();
  const [singlePost, setSinglePost] = useState();
  const navigate = useNavigate();
  const checkPath = checkPageLocation(location.pathname);
  const { userLoginDetails } = useAuth();
  const { postToggle, setPostToggle } = usePost();
  const { bookmarkBtnClickHandler } = useBookmark();
  const bookmarkItemFound = userLoginDetails?.loggedInProfile?.bookmarks.some(
    (item) => item.id === singlePost?.id
  );
  const userFound = singlePost?.likes.find(
    (like) => like.userId === userLoginDetails.userId
  );

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
  }, [postToggle]);

  const likeBtnClickHandler = async (userId, postId) => {
    const { data, success, error } = await updateLikes(userId, postId);
    if (success) {
      setPostToggle((prev) => !prev);
    }
  };

  return (
    <div className={styles.singlePostMainWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
      <div className={styles.singlePostWrapper}>
        <div className={styles.singlePostHeading}>
          <ArrowLeft onClick={arrowBtnClickHandler} />
          <p>Post</p>
        </div>
        <div className={styles.singlePost}>
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
              <ThumbsUp
                color="var(--color-primary-700)"
                fill={`${userFound ? "hsl(23, 49%, 35%)" : "whitesmoke"}`}
                onClick={() =>
                  likeBtnClickHandler(userLoginDetails?.userId, singlePost?.id)
                }
              />
              <Bookmark
                color="var(--color-primary-700)"
                fill={`${
                  bookmarkItemFound ? "hsl(23, 49%, 35%)" : "hsl(30, 20%, 96%)"
                }`}
                onClick={() => bookmarkBtnClickHandler(singlePost)}
              />
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
