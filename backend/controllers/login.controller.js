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
        followers: [],
        following: [],
        bookmarks: [],
      })
      .select();

    if (!error && !profileError) {
      console.log({
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
    if (!error) {
      console.log({ loginData: data });
      // return { success: true, data: data, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: e };
  }
};
