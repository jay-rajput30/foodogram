export const checkPageLocation = (pathname) => {
  const pathnames = ["/login", "/signup"];
  return pathnames.find((item) => item === pathname) ? true : false;
};

export const getAvatar = () => {
  const avatars = [
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-boy.svg",
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-grandpa.svg",
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-granny.svg",
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-man-formal.svg",
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-man.svg",
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-wizard.svg",
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-woman-formal.svg",
    "https://ydeaiqvklkrvicygqzsp.supabase.co/storage/v1/object/public/avatars/avatar-woman.svg",
  ];
  return avatars[Math.floor(Math.random() * (7 - 1 + 1) + 1)];
};
