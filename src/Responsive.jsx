import React from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { ReactComponent as Logo } from "./Icons/LoginLogo.svg";

const Responsive = ({ children }) => {
  return (
    <>
      {isMobile ? (
        <>{children}</>
      ) : (
        <NoneMobileWrap>
          <LeftBox>
            <div>
              <Logo />
            </div>
            원활한 동작을 위해 <br />
            모바일에서 사용해 주세요
          </LeftBox>
          <AppBox>
            <div>{children}</div>
          </AppBox>
        </NoneMobileWrap>
      )}
    </>
  );
};

export default Responsive;

const NoneMobileWrap = styled.div`
  display: flex;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100vh;
  position: fixed;
  align-items: center;
  text-align: center;
  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

const AppBox = styled.div`
  position: absolute;
  right: 15rem;
  background-color: white;
  z-index: 10;
  max-width: 40rem;
  min-width: 40rem;
  & > div {
    width: 100%;
    min-height: 100vh;
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: 0px 5px 10px 1px grey;
  }
`;
