import React from "react";
import Header from "../Header";
import Nav from "../Nav";
import { StyleLayout } from "./style";
import { useRecoilState } from "recoil";
import { NavState } from "../../../Recoil/Atoms/OptionAtoms";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Layout = ({ children }) => {
  const { nickname } = useParams();
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const userNickname = parseData.nickname;
  const [isShow, setIsShow] = useRecoilState(NavState);
  const showOutImg = () => {
    if (isShow) {
      setIsShow(false);
    }
  };
  return (
    <StyleLayout isShow={isShow} onClick={showOutImg}>
      {nickname === userNickname ? null : <Header></Header>}

      {children}
      <Nav></Nav>
    </StyleLayout>
  );
};
export default Layout;
