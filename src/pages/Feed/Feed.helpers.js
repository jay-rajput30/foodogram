export const postFileUploadChangeHandler = async (e, setNewPostDetails) => {
  console.log({ target: e.target.files[0] });
  const postImage = e.target.files[0];
  const { data, error } = await supabase.storage
    .from("posts")
    .upload(
      `${e.target.files[0]?.name}-${userLoginDetails.userId}.${
        e.target.files[0]?.type.split("/")[1]
      }`,
      postImage
    );
  if (!error) {
    setNewPostDetails({
      ...newPostDetails,
      postImgUrl: data?.path,
    });
  }
};
