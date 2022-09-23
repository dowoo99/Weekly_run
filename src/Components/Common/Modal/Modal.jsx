import React from "react";
import styled from "styled-components";

const Modal = ({ children, onClickYes, onClickNo, noneStyle }) => {
  return (
    <ModalBackground>
      {noneStyle ? (
        <>{children}</>
      ) : (
        <ModalWrap>
          {children}
          <div>
            {onClickYes && <button onClick={onClickYes}>네</button>}
            {onClickNo && <button onClick={onClickNo}>아니오</button>}
          </div>
        </ModalWrap>
      )}
    </ModalBackground>
  );
};

export default Modal;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  width: 30.4rem;
  height: 17.4rem;
  & p {
    margin: 4rem 0rem;
    text-align: center;
  }
  & button {
    border: none;
    background-color: white;
    font-size: 1.6rem;
  }
  & div {
    gap: 10rem;
    display: flex;
  }
`;
