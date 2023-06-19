import { supabase } from "../db/db.connect";

export const createPost = async (postDetails) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert(postDetails)
      .select();
    if (!error) {
      return { success: true, data, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
export const getAllPosts = async () => {
  try {
    const { data, error } = await supabase.from("posts").select();
    if (!error) {
      return { success: true, data, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
export const getUserFollowingPosts = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select()
      .eq("userId", userId);

    const { postData, postError } = await supabase
      .from("posts")
      .select()
      .in("userId", [...data[0].following, userId]);
    if (!postError && !error) {
      return { success: true, data: postData, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};

export const updateLike = async (userId, postId) => {
  try {
    let { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("userId", userId);

    let { data: post, postError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId);
    console.log({
      post: post[0],
      profile: profile[0],
      founduser: post[0]?.likes.includes((item) => item.id === userId),
    });

    if (post[0]?.likes.includes((item) => item.id === userId)) {
      const { updatedPost, updatedpostError } = await supabase
        .from("posts")
        .update({ likes: post[0]?.likes.filter((item) => item.id !== userId) })
        .eq("id", postId)
        .select();
      console.log({ updatedPost: updatedPost[0] });
    } else {
      const { updatedPost, updatedpostError } = await supabase
        .from("posts")
        .update({ likes: [...post[0]?.likes, profile[0]] })
        .eq("id", postId)
        .select();
      console.log({ updatedPost: updatedPost[0] });
    }
    if (!error && !updatedpostError) {
      console.log("inside update post call");
      return { success: true, data: updatedPost[0], error: e };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
