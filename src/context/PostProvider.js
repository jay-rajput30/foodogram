import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../backend/db/db.connect";
import { useAuth } from "./AuthProvider";

const postContext = createContext();

const PostProvider = ({ children }) => {
  const [userPosts, setUserPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postToggle, setPostToggle] = useState(false);
  const { userLoginDetails } = useAuth();
  const fetchPosts = async () => {
    try {
      const { allPostsData, allPostsError } = await supabase
        .from("posts")
        .select();
      const { data, error } = await supabase
        .from("profile")
        .select()
        .eq("userId", userLoginDetails?.userId);
      // console.log({ allPostsData, data, user: userLoginDetails?.userId });
      const { postData, postError } = await supabase
        .from("posts")
        .select()
        .in("userId", [...data[0].following, userLoginDetails?.userId]);
      if (!postError && !error && !allPostsError) {
        setUserPost(postData[0]);
        setAllPosts(allPostsData[0]);
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
