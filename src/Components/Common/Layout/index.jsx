import React from "react";
import Header from "../Header";
import Nav from "../Nav";
import { StyleLayout } from "./style";
import { useRecoilState } from "recoil";
import { NavState } from "../../../Recoil/Atoms/OptionAtoms";
import { useParams } from "react-router-dom";

const Layout = ({ children, show }) => {
  const [isShow, setIsShow] = useRecoilState(NavState);
  const showOutImg = () => {
    if (isShow) {
      setIsShow(false);
    }
  };
  return (
    <StyleLayout isShow={isShow} onClick={showOutImg}>
      {!show ? null : <Header></Header>}

      {children}
      <Nav></Nav>
    </StyleLayout>
  );
};
export default Layout;
