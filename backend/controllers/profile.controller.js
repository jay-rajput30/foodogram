import { supabase } from "../db/db.connect";

export const followUser = async (user, followProfile) => {
  try {
    //fetch current user and follow user profile details

    const { data: userData, userError } = await supabase
      .from("profile")
      .select("*")
      .eq("userId", user.userId);

    const { data: followerData, followerError } = await supabase
      .from("profile")
      .select("*")
      .eq("userId", followProfile.userId);

    //check if values already present in current user following and follow user user followers list
    //if not present add them else remove them.

    if (
      !userData[0].following.some((item) => item.userId === user?.userId) &&
      !followerData[0].followers.some((item) => item.userId === user?.userId)
    ) {
      const updatedUserFollowingList = [
        ...userData[0].following,
        followProfile,
      ];
      const { data: updatedUserData, error } = await supabase
        .from("profile")
        .update({ following: updatedUserFollowingList })
        .eq("userId", user.userId)
        .select();

      const { data: updatedFollowerData, updatedFollowerError } = await supabase
        .from("profile")
        .update({ followers: [...followerData[0].followers, user] })
        .eq("userId", followProfile.userId)
        .select();

      if (!error && !updatedFollowerError) {
        return { sucess: true, data: updatedUserData[0], error: null };
      }
    } else {
      const { data: updatedUserData, error } = await supabase
        .from("profile")
        .update({
          following: userData[0].following.filter(
            (item) => item.userId !== followProfile.userId
          ),
        })
        .eq("userId", user.userId)
        .select();

      const { data: updatedFollowerData, updatedFollowerError } = await supabase
        .from("profile")
        .update({
          followers: followerData[0].followers.filter(
            (item) => item.userId !== user.userId
          ),
        })
        .eq("userId", followProfile.userId)
        .select();
      if (!error && !updatedFollowerError) {
        return { sucess: true, data: updatedUserData[0], error: null };
      }
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};

export const getProfile = async (profileId) => {
  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("userId", profileId);
    if (!error) {
      return { success: true, data: profile[0], error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};

export const updateProfile = async (profileId, updatedProfile) => {
  try {
    const { data: profileData, profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("userId", profileId);

    const { data: updateProfileData, updatedProfileError } = await supabase
      .from("profile")
      .update({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        profileImg: updatedProfile.profileImg,
        bio: updatedProfile.bio,
        portfolioUrl: updatedProfile.portfolioUrl,
      })
      .eq("userId", profileId);

    const { data: updatePostData, updatedPostError } = await supabase
      .from("posts")
      .update({
        profileImg: updatedProfile.profileImg,
      })
      .eq("userId", profileId)
      .select("*");

    if (!updatedProfileError) {
      return { success: true, data: updateProfileData, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
