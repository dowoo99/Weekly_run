import React, { useState, useEffect } from "react";
import useInterval from "../../../Hooks/useInterval";
import { runData } from "../../../Recoil/Atoms/RunData";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const RunTimer = ({ stopInterval, endRun }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [path, setPath] = useRecoilState(runData);

  useInterval(
    () => {
      if (second === 59) {
        setMinute(prev => prev + 1);
        setSecond(-1);
        if (minute === 59) {
          setHour(prev => prev + 1);
          setMinute(0);
        }
      }
      setSecond(prev => prev + 1);
    },
    stopInterval ? null : 1000
  );

  useEffect(() => {
    if (endRun) {
      setPath(prev => ({
        ...prev,
        time: { hour, minute, second }
      }));
    }
  }, [endRun]);

  return (
    <TimerWrap>
      {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}:{second < 10 ? "0" + second : second}
    </TimerWrap>
  );
};
export default RunTimer;

const TimerWrap = styled.div`
  width: 13.8rem;
  font-family: "Anton";
  font-weight: 373;
  font-size: 4.8rem;
  line-height: 6rem;
  letter-spacing: 0.02em;

  color: #ffffff;
`;
