import React, { useCallback } from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../../../Icons/myPageProfile.svg";
import { useNavigate } from "react-router-dom";

const RankBody = ({ rankData }) => {
  const navigate = useNavigate();

  const divideTime = useCallback(time => {
    let seconds = Math.floor(time % 60);
    let minute = Math.floor((time / 60) % 60);
    let hours = Math.floor((time / (60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minute + ":" + seconds;
  }, []);

  const goToUser = (nickname, userId) => {
    navigate(`/user/${nickname}`, {
      state: { userId: userId }
    });
  };

  return (
    <RankListWrap>
      {rankData?.map((ranking, idx) => {
        return (
          <RankList key={idx} onClick={() => goToUser(ranking.nickname, ranking.userId)}>
            <tr>
              <td>
                <div>{idx + 1}</div>
              </td>
              <td>{ranking.profile ? <img src={ranking.profile} /> : <Profile />}</td>
              <td>{ranking.nickname}</td>
              <td>
                <div>{ranking.distance}Km</div>
                <div>{divideTime(ranking.time)}</div>
              </td>
            </tr>
          </RankList>
        );
      })}
    </RankListWrap>
  );
};

export default RankBody;

const RankListWrap = styled.div`
  padding: 0 1.6rem;
`;
const RankList = styled.table`
  padding: 0 2rem;
  display: flex;
  border-bottom: 0.1rem solid #e6e6e6;
  text-align: center;

  & td {
    text-align: center;
    height: 10rem;
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

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
