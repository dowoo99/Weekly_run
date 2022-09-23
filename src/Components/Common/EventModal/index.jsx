import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { instance } from "../../../Utils/Instance";
import EventImage from "./eventPopup.jpeg";

const googleForms =
  "https://docs.google.com/forms/d/e/1FAIpQLSdZDs9en5KjtUB_eSl19kfMrvtTITl31Y57J7au95ZPUkZ2SQ/viewform?usp=sf_link";

const EventModal = () => {
  const [showEventModal, setShowEventModal] = useState(true);

  const onClickWeek = useCallback(async () => {
    setShowEventModal(false);
    const { data } = await instance.put("/api/user/research");
  }, []);

  const onClickModal = useCallback(() => {
    setShowEventModal(false);
  }, []);

  if (!showEventModal) {
    return null;
  }

  return (
    <ModalBackground>
      <EventModalWrap>
        <EventBox>
          <EventBody>
            <a href={googleForms} target="_blank">
              <img src={EventImage} alt="리뷰 이벤트" />
            </a>
          </EventBody>
          <ButtonWrap>
            <button onClick={onClickWeek}>이번주 그만보기</button>
            <button onClick={onClickModal}>&times;</button>
          </ButtonWrap>
        </EventBox>
      </EventModalWrap>
    </ModalBackground>
  );
};

export default EventModal;
const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

const EventModalWrap = styled.div`
  position: absolute;
  top: 7rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding-top: 1rem;
`;

const EventBox = styled.div`
  margin: auto;
  width: 90%;
  height: 70%;
`;

const EventBody = styled.div`
  height: 100%;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const ButtonWrap = styled.div`
  background-color: #353434;
  display: flex;
  width: 100%;
  justify-content: space-between;
  & button {
    right: 2rem;
    color: white;
    border: none;
    background-color: inherit;
    font-size: 1.6rem;
  }
  & button:last-child {
    font-size: 4rem;
  }
`;
