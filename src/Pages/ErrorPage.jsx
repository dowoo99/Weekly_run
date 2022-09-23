import React, { useCallback } from "react";

import styled from "styled-components";

import ErrorIcon from "../Icons/warning.png";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, []);

  const goHome = useCallback(() => {
    navigate("/feed");
  }, []);

  return (
    <Body>
      <IconBox>
        <img src={ErrorIcon} />
      </IconBox>
      <ErrorBody>
        <ErrorTitle>서비스에 접속할 수 없습니다.</ErrorTitle>
        <ErrorContent>
          죄송합니다. 기술적인 문제로 일시적으로접속되지 않았습니다.
          <br />
          잠시 후 다시 이용 부탁 드리며 <br /> 이용에 불편을 드려 사과드립니다.
        </ErrorContent>
      </ErrorBody>
      <ButtonWrap>
        <button onClick={goBack}>이전</button>
        <button onClick={goHome}>홈으로</button>
      </ButtonWrap>
    </Body>
  );
};

export default ErrorPage;

const Body = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const IconBox = styled.div`
  text-align: center;
  margin: 3.5rem 0rem;
`;

const ErrorBody = styled.div``;

const ErrorTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ErrorContent = styled.div`
  padding: 0 9.5rem;
  font-size: 1.6rem;
  margin-bottom: 3rem;
  color: rgba(0, 0, 0, 0.6);
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 1.3rem;
  gap: 3.5rem;
  & button {
    width: 15%;
    height: 3.5rem;
    background-color: white;
    border: 0.1rem solid #e6e6e6;
  }
`;
