import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../backend/db/db.connect";
import { useAuth } from "./AuthProvider";

const postContext = createContext();

const PostProvider = ({ children }) => {
  const [userPosts, setUserPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postToggle, setPostToggle] = useState(false);
  const { userLoginDetails } = useAuth();
  console.log({ userId: userLoginDetails?.userId });
  const fetchPosts = async () => {
    try {
      const { data: allPostsData, allPostsError } = await supabase
        .from("posts")
        .select("*");
      console.log({ allPostsData });
      const { data: profileData, error } = await supabase
        .from("profile")
        .select("*")
        .eq("userId", userLoginDetails?.userId);
      console.log({ profileData });
      // console.log({ allPostsData, data, user: userLoginDetails?.userId });
      const { data: postData, postError } = await supabase
        .from("posts")
        .select("*")
        .in("userId", [...profileData[0]?.following, userLoginDetails?.userId]);
      console.log({ postData });
      if (!postError && !allPostsError) {
        setUserPost([...postData]);
        setAllPosts([...allPostsData]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [postToggle]);

  return (
    <postContext.Provider
      value={{
        userPosts,
        setUserPost,
        allPosts,
        setAllPosts,
        postToggle,
        setPostToggle,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;

export const usePost = () => {
  const {
    userPosts,
    setUserPost,
    allPosts,
    setAllPosts,
    postToggle,
    setPostToggle,
  } = useContext(postContext);

  return {
    userPosts,
    setUserPost,
    allPosts,
    setAllPosts,
    postToggle,
    setPostToggle,
  };
};
