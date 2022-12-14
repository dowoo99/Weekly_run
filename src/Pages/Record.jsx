import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";

import RunTimer from "../Components/RecordPage/RunTimer";
import RunningMap from "../Components/RecordPage/RunningMap/index";
import { instance } from "../Utils/Instance";
import { runData } from "../Recoil/Atoms/RunData";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Common/Modal/Modal";

import { ReactComponent as StopIcon } from "../Icons/StopIcon.svg";
import { ReactComponent as EndIcon } from "../Icons/EndIcon.svg";
import { ReactComponent as StartIcon } from "../Icons/StartIcon.svg";

const Record = () => {
  const [stopInterval, setStopInterval] = useState(true);
  const [endRun, setEndRun] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [start, setStart] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [goal, setGoal] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [path, setPath] = useRecoilState(runData);
  const runLog = useRecoilValue(runData);

  const userNickname = JSON.parse(localStorage.getItem("userData")).nickname;

  const navigate = useNavigate();

  const clearPath = () => {
    setPath({
      path: [],
      distance: 0,
      time: "",
      speed: "",
      isFinish: false
    });
  };

  let hour = runLog.time.hour * 60 * 60;
  let minute = runLog.time.minute * 60;
  let second = runLog.time.second;

  let totalTime = hour + minute + second;

  const stopRun = useCallback(() => {
    setStopInterval(prev => !prev);
  }, []);

  const onStart = useCallback(async () => {
    const { data } = await instance.get("/api/user/startbtn");
    setShowModal(false);
    setStopInterval(false);
    setStart(true);
  }, []);

  const onClickEnd = useCallback(async () => {
    setEndRun(true);
    setStopInterval(true);
    if (Number(runLog.distance / 1000).toFixed(1) <= 0) {
      setNoRecord(true);
    }
  });

  const onFeed = async () => {
    if (runLog.isFinish) {
      if (goal) {
        const { data } = await instance.post("/api/user/distance", {
          distance: runLog.distance,
          time: totalTime
        });
      }
      clearPath();
      navigate("/post", { state: { runLog } });
    }
  };

  const onNotFeed = async () => {
    if (runLog.isFinish) {
      if (goal) {
        const { data } = await instance.post("/api/user/distance", {
          distance: runLog.distance,
          time: totalTime
        });
      }
      clearPath();
      navigate("/feed");
    }
  };

  const onClickContinue = () => {
    setEndRun(false);
    setNoRecord(false);
  };

  const onClickNoContinue = () => {
    clearPath();
    navigate("/feed");
  };

  const onClickGoalYes = useCallback(() => {
    navigate(`/user/${userNickname}`);
  }, []);

  const onClickGoalNo = useCallback(() => {
    setShowGoalModal(false);
  }, []);

  useEffect(() => {
    async function getSetGoal() {
      const res = await instance.get("/api/user/goal");
      setGoal(res.data.goal);
      if (!res.data.goal) {
        setShowGoalModal(true);
      } else {
        setGoal(true);
      }
    }
    getSetGoal();
  }, []);

  return (
    <>
      <RunningMap stopInterval={stopInterval} endRun={endRun}></RunningMap>
      {start && (
        <RecordHeader>
          <HeaderWrap>
            <RunDistance>{(runLog.distance / 1000)?.toFixed(1)}km</RunDistance>
            <RunTimer stopInterval={stopInterval} endRun={endRun} />
          </HeaderWrap>
        </RecordHeader>
      )}
      {start && (
        <ButtonWrap>
          <div onClick={stopRun}>{!stopInterval ? <StopIcon /> : <StartIcon />}</div>
          <div onClick={onClickEnd}>
            <EndIcon />
          </div>
        </ButtonWrap>
      )}
      {showModal && (
        <Modal noneStyle={true}>
          <StartButton onClick={onStart}>
            <p>START!</p>
          </StartButton>
        </Modal>
      )}
      {endRun && (
        <Modal onClickNo={onNotFeed} onClickYes={onFeed}>
          <p>????????? ????????? ?????? ???????????????????</p>
        </Modal>
      )}
      {noRecord && (
        <Modal onClickYes={onClickContinue} onClickNo={onClickNoContinue}>
          <p>
            100m????????? ????????? ???????????? ??? ?????????
            <br />
            ??????????????????????
          </p>
        </Modal>
      )}
      {showGoalModal && (
        <Modal onClickYes={onClickGoalYes} onClickNo={onClickGoalNo}>
          <p>
            ?????? ????????? ????????? ????????? ???????????? ????????? <br />
            ????????? ??????????????????????
          </p>
        </Modal>
      )}
    </>
  );
};

export default Record;

const StartButton = styled.div`
  background: #333333;
  border-radius: 1.2rem;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 5rem;
  p {
    font-family: "Anton";
    font-size: 4.6rem;
    line-height: 5.5rem;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
`;

const HeaderWrap = styled.div`
  width: 82%;
  display: flex;
  justify-content: space-between;
`;

const RecordHeader = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 6.2rem 3.2rem 4.2rem;
  position: fixed;
  width: 100%;
  top: 0;
  background: #333333;
  @media only screen and (min-width: 880px) {
    right: 10;
    max-width: 33.6rem;
  }
`;

const RunDistance = styled.div`
  font-family: "Anton";
  font-size: 4.8rem;
  line-height: 5.8rem;
  width: 9.6rem;
  height: 5.8rem;
  color: white;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  width: 100%;
  height: 5.2rem;
  z-index: 10;
  position: absolute;
  top: 38rem;
`;
