import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import SignUp from "./pages/SignUp/SignUp";

const App = () => {
  return (
    <div className="main-wrapper">
      <div className="logo-wrapper">
        <h1 className="logoText">Foodogram</h1>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
