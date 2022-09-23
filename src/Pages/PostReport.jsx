import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../Icons/BackIcon.svg";
import { instance } from "../Utils/Instance";
import Loading from "../Components/Common/Loading/Loading";

const PostReport = () => {
  const [reportNum, setReportNum] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  const postId = state.postId;

  const navigate = useNavigate();

  const onSubmit = async () => {
    const res = await instance.post(`/api/user/report/post/${postId}`, { check: reportNum });
    if (res.status === 200) {
      setIsLoading(true);
    } else {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (isLoading) {
      const LoadingScreen = setTimeout(() => {
        navigate("/feed");
      }, 2000);
      return () => clearTimeout(LoadingScreen);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading>신고가 접수되었어요</Loading>;
  }

  return (
    <>
      <ReportHeader>
        <HeaderItems>
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon />
          </div>
          <div>신고하기</div>
          <div onClick={onSubmit}>완료</div>
        </HeaderItems>
      </ReportHeader>
      <ReportBody>
        <BodyTitle>
          조금 더 자세히 설명해주세요. <br />이 피드의 어떤 점이 문제인가요?
        </BodyTitle>
        <ReportList>
          <ReportType onClick={() => setReportNum(1)}>욕설, 비방, 차별, 혐오</ReportType>
          <ReportType onClick={() => setReportNum(2)}>홍보, 영리목적</ReportType>
          <ReportType onClick={() => setReportNum(3)}>불법정보</ReportType>
          <ReportType onClick={() => setReportNum(4)}>음란, 청소년 유해물</ReportType>
          <ReportType onClick={() => setReportNum(5)}>개인 정보 노출, 유포, 거래</ReportType>
          <ReportType onClick={() => setReportNum(6)}>도배, 스팸</ReportType>
          <ReportType onClick={() => setReportNum(7)}>기타</ReportType>
        </ReportList>
      </ReportBody>
    </>
  );
};

export default PostReport;

const ReportHeader = styled.div`
  display: flex;
  align-items: flex-start;
  height: 4.3rem;
`;

const HeaderItems = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #e6e6e6;
  & div {
    font-size: 1.6rem;
    line-height: 2.3rem;
  }
  & > div:last-child {
    color: #f03800;
  }
`;

const ReportBody = styled.div``;

const BodyTitle = styled.div`
  width: 100%;
  margin: 8rem 0 5rem 0;
  height: 20%;
  text-align: center;
  font-size: 2.4rem;
  color: rgba(0, 0, 0, 0.5);
`;

const ReportList = styled.div`
  border: 0.1rem solid #e6e6e6;
  padding: 2rem;
`;

const ReportType = styled.button`
  background-color: white;
  border: none;
  text-align: left;
  width: 100%;
  font-size: 2rem;
  padding: 1.8rem 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  &:focus {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
  }
`;
