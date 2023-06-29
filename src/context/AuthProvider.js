import { createContext, useContext, useState } from "react";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userLoginDetails, setUserloginDetails] = useState({
    email: null,
    userId: null,
    token: null,
    loggedInProfile: null,
  });
  const [profileToggle, setProfileToggle] = useState(false);
  const updateUserLoginDetails = (userDetails) => {
    setUserloginDetails(userDetails);
  };
  return (
    <authContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        userLoginDetails,
        updateUserLoginDetails,
        profileToggle,
        setProfileToggle,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const {
    loginStatus,
    setLoginStatus,
    userLoginDetails,
    updateUserLoginDetails,
    profileToggle,
    setProfileToggle,
  } = useContext(authContext);
  return {
    loginStatus,
    setLoginStatus,
    userLoginDetails,
    updateUserLoginDetails,
    profileToggle,
    setProfileToggle,
  };
};

export default AuthProvider;
