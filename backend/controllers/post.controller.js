import { supabase } from "../db/db.connect";

export const createPost = async (postDetails) => {
  try {
    let { data: profile, error } = await supabase
      .from("profile")
      .select("username,profileImg,firstName,lastName")
      .eq("userId", postDetails.userId);

    const { data, postError } = await supabase
      .from("posts")
      .insert({
        ...postDetails,
        username: profile[0].username,
        profileImg: profile[0].profileImg,
        name: `${profile[0].firstName} ${profile[0].lastName}`,
      })
      .select();
    console.log({ postDetails, profile: profile[0] });
    if (!error && !postError) {
      return { success: true, data, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};

export const getPosts = async (profileId) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .eq("userId", profileId);
    if (!error) {
      console.log({ data });
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
    const { data: profileData, error } = await supabase
      .from("profile")
      .select()
      .eq("userId", userId);
    console.log({
      userProfileData: profileData,
      arr: [...profileData[0].following],
    });
    const { data: postData, postError } = await supabase
      .from("posts")
      .select()
      .in("userId", [...profileData[0].following, userId]);
    console.log({ userPostData: postData });
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

    const { data: updatedPost, updatedpostError } = await supabase
      .from("posts")
      .update({
        likes: updatedLikesArray,
      })
      .eq("id", postId)
      .select();

    if (!error && !postError) {
      return { success: true, data: updatedPost[0], error: updatedpostError };
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
      console.log({ profiles });
      return { success: true, data: profiles, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
