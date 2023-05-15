import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";
import MyPage from "../pages/MyPage";
import UserPage from "../pages/UserPage";
import AccountPage from "../pages/AccountPage";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AccountPage />}>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/main/:id" element={<DetailPage />}></Route>
        <Route path="/my" element={<MyPage />}></Route>
        <Route path="/user/:id" element={<UserPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
