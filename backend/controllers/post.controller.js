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

export const updateLikes = async (userId, postId) => {
  try {
    let { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("userId", userId);

    let { data: post, postError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId);

    let updatedLikesArray = [];
    if (!post[0].likes.some((item) => item.userId === userId)) {
      updatedLikesArray = [...post[0]?.likes, profile[0]];
    } else {
      updatedLikesArray = post[0]?.likes.filter(
        (item) => item.userId !== userId
      );
    }

    const { updatedPost, updatedpostError } = await supabase
      .from("posts")
      .update({
        likes: updatedLikesArray,
      })
      .eq("id", postId)
      .select();

    if (!error && !postError && !updatedpostError) {
      return { success: true, data: updatedPost[0], error: e };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};

export const getSuggestProfiles = async () => {
  try {
    let { data: profiles, error } = await supabase
      .from("profile")
      .select("*")
      .range(0, 2);
    if (!error) {
      return { success: true, data: profiles, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
