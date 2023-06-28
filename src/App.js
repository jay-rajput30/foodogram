import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Feed from "./pages/Feed/Feed";
import Explore from "./pages/Explore/Explore.";
import Bookmark from "./pages/Bookmark/Bookmark";
import Profile from "./pages/Profile/Profile";
import MyProfile from "./pages/Profile/MyProfile/MyProfile";

const App = () => {
  return (
    <div className="main-wrapper">
      <div className="logo-wrapper">
        <h1 className="logoText">Foodogram</h1>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
