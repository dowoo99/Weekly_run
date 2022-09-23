import React, { useState } from "react";
import { StyleModalBox, StyleModal, StyleInput, StyleButton } from "./style";
import { useGoal } from "../../../Hooks/useGoal";
import { usePutGoal } from "../../../Hooks/usePutGoal";
import { useRecoilState } from "recoil";
import { ModalState } from "../../../Recoil/Atoms/OptionAtoms";
const Modal = ({ done }) => {
  const { mutate: post } = useGoal();
  const { mutate: put } = usePutGoal();

  const [modal, setModal] = useRecoilState(ModalState);
  const [goal, setGoal] = useState({
    goal: ""
  });
  const onChangeHandeler = e => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const onSubmitHandeler = () => {
    post(goal);
    setModal(false);
    setGoal({
      goal: ""
    });
  };
  const onPutHandeler = () => {
    put(goal);
    setGoal({
      goal: ""
    });
    setModal(false);
  };
  return (
    <StyleModalBox>
      <StyleModal>
        <div>
          <label>일주일 간의 목표를 설정해주세요!</label>
          <StyleInput
            name="goal"
            onChange={onChangeHandeler}
            type="number"
            min="0"
            value={goal.goal}
            placeholder="0km"
          ></StyleInput>

          <StyleButton>
            <span
              onClick={() => {
                setModal(false);
              }}
            >
              취소
            </span>
            {done ? (
              <span
                onClick={() => {
                  onPutHandeler();
                }}
              >
                수정
              </span>
            ) : (
              <span
                onClick={() => {
                  onSubmitHandeler();
                }}
              >
                등록
              </span>
            )}
          </StyleButton>
        </div>
      </StyleModal>
    </StyleModalBox>
  );
};
export default Modal;
