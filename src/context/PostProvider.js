import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../backend/db/db.connect";
import { useAuth } from "./AuthProvider";

const postContext = createContext();

const PostProvider = ({ children }) => {
  const [userPosts, setUserPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postFilterOption, setPostFilterOption] = useState("");
  const [postToggle, setPostToggle] = useState(false);
  const { userLoginDetails } = useAuth();

  const fetchPosts = async () => {
    try {
      const { data: allPostsData, allPostsError } = await supabase
        .from("posts")
        .select("*");

      const { data: profileData, error } = await supabase
        .from("profile")
        .select("*")
        .eq("userId", userLoginDetails?.userId);

      const { data: postData, postError } = await supabase
        .from("posts")
        .select("*")
        .in("userId", [
          ...profileData[0]?.following.map((item) => item.userId),
          userLoginDetails?.userId,
        ]);

      if (!postError && !allPostsError) {
        setUserPost([...postData]);
        setAllPosts([...allPostsData]);
      }
    } catch (e) {
      e;
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
        postFilterOption,
        setPostFilterOption,
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
    postFilterOption,
    setPostFilterOption,
  } = useContext(postContext);

  return {
    userPosts,
    setUserPost,
    allPosts,
    setAllPosts,
    postToggle,
    setPostToggle,
    postFilterOption,
    setPostFilterOption,
  };
};
