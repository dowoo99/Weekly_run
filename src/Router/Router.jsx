import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import loadable from "@loadable/component";

const Login = loadable(() => import("../Pages/Login"));
const Feed = loadable(() => import("../Pages/Feed"));
const Post = loadable(() => import("../Pages/Post"));
const Record = loadable(() => import("../Pages/Record"));
const Reply = loadable(() => import("../Pages/Reply"));
const Search = loadable(() => import("../Pages/Search"));
const SignUp = loadable(() => import("../Pages/SignUp"));
const UserPage = loadable(() => import("../Pages/UserPage"));
const ProfileSignup = loadable(() => import("../Components/Signup/profileSignup"));
const Rank = loadable(() => import("../Pages/Rank"));
const NaverSignup = loadable(() => import("../Components/Signup/naverSignup"));
const BugReport = loadable(() => import("../Pages/BugReport"));
const PostReport = loadable(() => import("../Pages/PostReport"));
const ErrorPage = loadable(() => import("../Pages/ErrorPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/record" element={<Record />} />
        <Route path="/reply/:id" element={<Reply />} />
        <Route path="/reply" element={<Reply />} />
        <Route path="/search" element={<Search />} />
        <Route path="/api/kakao/callback" element={<ProfileSignup />} />
        <Route path="/api/naver/callback" element={<NaverSignup />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:nickname" element={<UserPage />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/bugreport" element={<BugReport />} />
        <Route path="/postreport" element={<PostReport />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
