import styled from "styled-components";
export const StyleWrap = styled.div`
  width: 100%;
`;
export const StyleProgress = styled.div`
  width: 90%;
  height: 23rem;
  background-color: rgba(53, 52, 52, 1);
  box-sizing: border-box;
  border-radius: 1.2rem;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
export const StyleProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  text-align: center;
`;
export const StylePutBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #ffffff;
  align-items: center;
  text-align: center;
  & > span {
    width: 100%;
    position: absolute;
    margin-left: 83%;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: -2.5rem;
  }
  & > div {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 2.5rem;
  }
`;

export const StyleProgressGoalData = styled.span`
  font-size: 1.6rem;
  text-align: center;
`;
export const StyleNextProgress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 0.8rem;
  width: 100%;
  height: 23rem;
  background: #353434;
  border-radius: 12px;
`;
export const StyleSevenProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 23rem;
`;
export const StyleSevenTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 4.7rem;
  width: 100%;
  color: #ffffff;
`;
export const StyleSevenGoal = styled.span`
  padding: 1.2rem 1.4rem;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  text-align: center;
  color: #ffffff;
`;
export const StyleGoalDate = styled.span`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 17px;
  text-align: center;
  padding: 1.2rem 1.4rem;
`;
export const StyleSevenDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 1.4rem;
  width: 95%;
  position: relative;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0px;
    font-size: 1rem;
    color: #ffffff;
    & > span {
      width: 100%;
      text-align: center;
    }
  }
`;
export const StyleSpanDistance = styled.span`
  color: ${({ Distance }) => (Distance === 0 ? "#4D4D4D;" : "#ffffff")};
  font-size: 1.6rem;
`;
export const StyleSpanTime = styled.span`
  color: ${({ Time }) => (Time === 0 ? "#4D4D4D;" : "#ffffff")}; ;
`;

export const StyleDistanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2.2rem;
  height: 9.6rem;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
    padding: 0 4rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    & > span:first-child {
      font-size: 3.6rem;
      text-align: center;
      align-items: center;
      display: flex;
    }
    & > span:nth-child(2) {
      width: 120%;
      font-size: 12px;
    }
  }
`;
