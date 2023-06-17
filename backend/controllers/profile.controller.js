import { supabase } from "../db/db.connect";

export const followUser = async (userId, followerId, newFollowerList) => {
  try {
    //fetch current user and follow user profile details
    const { userData, userError } = await supabase
      .from("profile")
      .select()
      .eq("userId", userId);

    const { followerData, followerError } = await supabase
      .from("profile")
      .select()
      .eq("userId", followerId);
    //check if values already present in current user following and follow user user followers list
    //if not present add them else remove them.
    if (
      !userData[0].following.includes(followerId) &&
      !followerData[0].followers.includes(userId)
    ) {
      const { data, error } = await supabase
        .from("profile")
        .update({ following: newFollowerList })
        .eq("userId", userId)
        .select();

      const { updatedFollowerData, updatedFollowerError } = await supabase
        .from("profile")
        .update({ followers: [...followerData[0].followers, userId] })
        .eq("userId", followerId)
        .select();
      if (!error && !updatedFollowerError) {
        return { sucess: true, data: data[0], error: null };
      }
    } else {
      const { data, error } = await supabase
        .from("profile")
        .update({
          following: userData[0].following.filter(
            (item) => item !== followerId
          ),
        })
        .eq("userId", userId)
        .select();

      const { updatedFollowerData, updatedFollowerError } = await supabase
        .from("profile")
        .update({
          followers: followerData[0].followers.filter(
            (item) => item !== userId
          ),
        })
        .eq("userId", followerId)
        .select();
      if (!error && !updatedFollowerError) {
        return { sucess: true, data: data[0], error: null };
      }
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
