import React, { useState } from "react";
import { useGoal } from "../../../Hooks/useGoal";
import { StyleGoal, StyleGoalButton, StyleModalBox, StyleModal, StyleInput, StyleButton } from "./style";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ModalState } from "../../../Recoil/Atoms/OptionAtoms";
import Modal from "../Modal";
const Goal = ({ userNickname, done }) => {
  const [modal, setModal] = useRecoilState(ModalState);
  const { nickname } = useParams();
  return (
    <>
      {nickname === userNickname ? (
        <div style={{ height: "23rem" }}>
          {modal ? <Modal done={done} /> : null}
          <StyleGoal>
            <StyleGoalButton
              onClick={() => {
                setModal(true);
              }}
            >
              목표설정하기
            </StyleGoalButton>
            <div>이번주 목표를 입력하세요</div>
          </StyleGoal>
        </div>
      ) : null}
    </>
  );
};
export default Goal;
