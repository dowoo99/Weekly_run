import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../Icons/BackIcon.svg";

import PostItem from "./postItem";
import ReplyComponent from "./replyComponent";

const ReplyCom = () => {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  return (
    <Body>
      <HeaderWrap>
        <HeaderItems>
          <div
            onClick={() => {
              navigate("/feed");
            }}
          >
            <BackIcon />
          </div>
          <div>답글</div>
        </HeaderItems>
      </HeaderWrap>
      <PostItem data={data} />
      <ReplyComponent />
    </Body>
  );
};

export default ReplyCom;

const Body = styled.div`
  overflow-x: hidden;
`;
const HeaderWrap = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem;
  height: 4.3rem;
`;

const HeaderItems = styled.div`
  display: flex;
  padding: 1rem 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #e6e6e6;
  & div {
    font-size: 1.6rem;
    line-height: 2.3rem;
    width: 46.8%;
  }
`;
