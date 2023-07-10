import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Feed from "./pages/Feed/Feed";
import Explore from "./pages/Explore/Explore.";
import Bookmark from "./pages/Bookmark/Bookmark";
import Profile from "./pages/Profile/Profile";
import MyProfile from "./pages/Profile/MyProfile/MyProfile";
import SinglePost from "./pages/SinglePost/SinglePost";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="main-wrapper">
      <div className="logo-wrapper">
        <h1 className="logoText" onClick={() => navigate("/feed")}>
          Foodogram
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/feed"
          element={
            // <ProtectedRoutes>
            <Feed />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/explore"
          element={
            // <ProtectedRoutes>
            <Explore />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/bookmark"
          element={
            // <ProtectedRoutes>
            <Bookmark />
            //   </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            // <ProtectedRoutes>
            <MyProfile />
            // /* </ProtectedRoutes> */
          }
        />
        <Route
          path="/profile/:id"
          element={
            // <ProtectedRoutes>
            <Profile />
            //  /* </ProtectedRoutes> */
          }
        />
        <Route
          path="/post/:id"
          element={
            // <ProtectedRoutes>
            <SinglePost />
            //  /* </ProtectedRoutes> */
          }
        />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
