import React from "react";
import styled from "styled-components";

import { ReactComponent as KakaoLoginIcon } from "../Icons/KakaoLoginIcon.svg";
import { ReactComponent as NaverLoginIcon } from "../Icons/NaverLoginIcon.svg";
import { ReactComponent as Logo } from "../Icons/LoginLogo.svg";

const KAKAO_LOGIN = "https://yunseong.shop/api/kakao/callback";
const NAVER_LOGIN = "http://yunseong.shop/api/naver/callback";

const Login = () => {
  return (
    <>
      <LoginLogo>
        <Logo />
      </LoginLogo>
      <LoginLink>
        <a href={KAKAO_LOGIN}>
          <KakaoLoginIcon />
        </a>
        <a href={NAVER_LOGIN}>
          <NaverLoginIcon />
        </a>
      </LoginLink>
    </>
  );
};

export default Login;

const LoginLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 10rem;
  padding: 1.2rem 0rem 0rem;
  height: 24.5rem;
  width: 100%;
  overflow: hidden;
`;

const LoginLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  gap: 1rem;
  margin: 0 auto;
  width: 100%;
  position: absolute;
  bottom: 8.1rem;
`;
