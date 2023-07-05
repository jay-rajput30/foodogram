import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { updateBookmark } from "../../backend/controllers/post.controller";

const bookmarkContext = createContext({});

const BookmarkProvider = ({ children }) => {
  const { userLoginDetails, setUserloginDetails } = useAuth();

  const bookmarkBtnClickHandler = async (post) => {
    try {
      const { data, success } = await updateBookmark(
        post,
        userLoginDetails?.userId
      );
      if (success) {
        setUserloginDetails({
          ...userLoginDetails,
          loggedInProfile: {
            ...userLoginDetails.loggedInProfile,
            bookmarks: data,
          },
        });
        console.log({ data });
      }
    } catch (e) {
      console.error({ error: e });
    }
  };
  return (
    <bookmarkContext.Provider value={{ bookmarkBtnClickHandler }}>
      {children}
    </bookmarkContext.Provider>
  );
};

export default BookmarkProvider;

export const useBookmark = () => {
  const {   bookmarkBtnClickHandler } =
    useContext(bookmarkContext);

  return {  bookmarkBtnClickHandler };
};
