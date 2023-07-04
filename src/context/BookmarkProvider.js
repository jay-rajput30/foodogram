import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import { updateBookmark } from "../../backend/controllers/post.controller";

const bookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const { userLoginDetails } = useAuth();
  const [bookmark, setBookmark] = useState(
    userLoginDetails?.loggedInProfile?.bookmarks
  );

  const bookmarkBtnClickHandler = async (post) => {
    try {
      const { data, success } = await updateBookmark(
        post,
        userLoginDetails?.userId
      );
      if (success) {
        setBookmark({ ...bookmark, data });
      }
    } catch (e) {
      console.error({ error: e });
    }
  };
  return (
    <bookmarkContext.Provider
      value={{ bookmark, setBookmark, bookmarkBtnClickHandler }}
    >
      {children}
    </bookmarkContext.Provider>
  );
};

export default BookmarkProvider;

export const useBookmark = () => {
  const { bookmark, setBookmark, bookmarkBtnClickHandler } =
    useContext(bookmarkContext);

  return { bookmark, setBookmark, bookmarkBtnClickHandler };
};
