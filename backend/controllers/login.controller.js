import { supabase } from "../db/db.connect";

export const signUpUser = async (userDetails) => {
  try {
    let { data, error } = await supabase.auth.signUp({
      email: userDetails.email,
      password: userDetails.password,
    });

    const { profileData, profileError } = await supabase
      .from("profile")
      .insert({
        userId: data.user?.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        username: userDetails.username,
        followers: [],
        following: [],
        bookmarks: [],
        profileImg: userDetails.profileImg,
        portfolioUrl: userDetails.portfolioUrl,
      })
      .select();

    if (!error && !profileError) {
      ({
        token: data.session.access_token,
        email: data.user.email,
        useId: data.user.id,
        profileData,
      });
      return { success: true, data: data, error: "" };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};

export const getLoginCredentials = async (userDetails) => {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: userDetails.email,
      password: userDetails.password,
    });
    let { data: userData, error: userError } = await supabase
      .from("profile")
      .select("*")
      .eq("userId", data.session.user.id);

    if (!error && !userError) {
      return {
        success: true,
        data: {
          email: data.session.user.email,
          userId: data.session.user.id,
          token: data.session.access_token,
          loggedInProfile: userData[0],
        },
        error: null,
      };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
