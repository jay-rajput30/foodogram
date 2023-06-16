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
