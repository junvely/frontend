import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import UserPage from "../pages/UserPage";
import Signup from "../pages/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/main/:id" element={<DetailPage />}></Route>
        <Route path="/my" element={<MyPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
