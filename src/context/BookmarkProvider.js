import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";

const bookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const { userLoginDetails } = useAuth();
  const [bookmark, setBookmark] = useState(
    userLoginDetails?.loggedInProfile?.bookmarks
  );

  const updateToBookmark = (post) => {
    const bookmarkFound = userLoginDetails?.loggedInProfile.some(
      (item) => item.id === post.id
    );

    if (bookmarkFound) {
    } else {
    }
  };
  return (
    <bookmarkContext.Provider value={{ bookmark, setBookmark }}>
      {children}
    </bookmarkContext.Provider>
  );
};

export default BookmarkProvider;

export const useBookmark = () => {
  const { bookmark, setBookmark } = useContext(bookmarkContext);

  return { bookmark, setBookmark };
};
