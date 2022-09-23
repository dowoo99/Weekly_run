import React from "react";
import styled from "styled-components";

import { ReactComponent as BackIcon } from "../../../Icons/BackIcon.svg";
import { useNavigate } from "react-router-dom";

const RankHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderWrap>
        <HeaderItems>
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon />
          </div>
          <div>랭킹</div>
        </HeaderItems>
      </HeaderWrap>
      <BodyWrap>
        <BodyHeader>Weekly Ranking</BodyHeader>
        <RankTitle>
          <tr>
            <td>순위</td>
            <td>이미지</td>
            <td>닉네임</td>
            <td>기록</td>
          </tr>
        </RankTitle>
      </BodyWrap>
    </>
  );
};

export default RankHeader;

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

const BodyWrap = styled.div`
  padding: 2.4rem 1.6rem 0.5rem;
`;

const BodyHeader = styled.div`
  padding: 1rem 0;
  font-family: "Anton";
  font-size: 2.4rem;
  letter-spacing: 0.23ch;
  text-align: center;
  border-bottom: 0.1rem solid #e6e6e6;
`;

const RankTitle = styled.table`
  padding: 1rem 2rem;
  display: flex;
  border-bottom: 0.1rem solid #e6e6e6;
  text-align: center;

  & td {
    text-align: center;
    justify-content: center;
  }
  & tr {
    width: 100%;
  }
  & td:first-child {
    width: 5rem;
  }
  & td:nth-child(2) {
    width: 10rem;
  }
  & td:nth-child(3) {
    width: 15rem;
  }
  & td:last-child {
    width: 10rem;
  }
`;
