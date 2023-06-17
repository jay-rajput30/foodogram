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
