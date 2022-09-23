import React, { useCallback, useState, useRef, useLayoutEffect, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

import { ReactComponent as ReplyUpdate } from "../../Icons/ReplyUpdate.svg";
import { ReactComponent as ReplyDelete } from "../../Icons/ReplyDelete.svg";

import Recomment from "./Recomment";
import displayedAt from "../../Utils/displayAt";
import { delReply } from "../../Hooks/useReply";
import { ReactComponent as Profile } from "../../Icons/myPageProfile.svg";
import { useRecoilState } from "recoil";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";
import Modal from "../Common/Modal/Modal";
import Lottie from "lottie-react";
import LeftArrow from "../../Lottie/LeftArrow.json";

const CommentList = ({ reply }) => {
  const [showReply, setShowReply] = useState(false);
  const [inputState, setInpuState] = useRecoilState(replyState);
  const [showModal, setShowModal] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  const userData = JSON.parse(window.localStorage.getItem("userData"));

  const replyRef = useRef(null);

  useLayoutEffect(() => {
    if (replyRef.current !== null) replyRef.current.focus();
  });

  const queryClient = useQueryClient();

  const onShowInputRecomment = useCallback(() => {
    setInpuState(prev => ({
      ...prev,
      showInput: "대댓글작성",
      postId: reply.commentId
    }));
  }, []);

  const onShowInputEdit = useCallback(() => {
    setInpuState(prev => ({
      ...prev,
      showInput: "댓글수정",
      postId: reply.commentId
    }));
    slideRef.current.style.transform = "translateX(0%)";
  });

  const onShowRecomment = useCallback(() => {
    setShowReply(prev => !prev);
  }, []);

  //댓글 삭제
  const delReplyData = useMutation(() => delReply(reply.commentId), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
      slideRef.current.style.transform = "translateX(0%)";
    },
    onError: error => {}
  });

  const handleDelreply = () => {
    delReplyData.mutate();
    setShowModal(false);
  };

  //슬라이드 만들기

  const slideRef = useRef();
  const [firstTouchX, setFirstTouchX] = useState("");

  const onTouchStart = e => {
    if (userData.nickname === reply.nickname) {
      setFirstTouchX(e.changedTouches[0].pageX);
      setShowArrow(true);
    }
  };

  const onTouchEnd = e => {
    setShowArrow(false);
    if (userData.nickname !== reply.nickname) return;
    let totalX = firstTouchX - e.changedTouches[0].pageX;

    if (totalX > 80) {
      slideRef.current.style.transform = "translateX(-13rem)";

      return;
    }
    if (totalX < -10) {
      slideRef.current.style.transform = "translateX(0%)";

      return;
    }
  };
  const onShowModal = useCallback(() => {
    slideRef.current.style.transform = "translateX(0%)";
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Body onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} ref={slideRef}>
        <CommentWrap>
          <div>{reply.image ? <img src={reply.image} /> : <Profile />}</div>
          <CommentBody>
            <Nick>{reply.nickname}</Nick>
            <div>{reply.comment}</div>
            <CommentFooter>
              <Time>{displayedAt(reply.createdAt)}</Time>
              <Write onClick={onShowInputRecomment}>답글달기</Write>
              {!showReply && (
                <div onClick={onShowRecomment}>
                  {reply.recommentNum > 0 ? <>답글 {reply.recommentNum}개 더보기</> : null}
                </div>
              )}
              {showReply && <div onClick={onShowRecomment}>답글 닫기</div>}
            </CommentFooter>
          </CommentBody>
          {showArrow && (
            <LottieWrap>
              <Lottie animationData={LeftArrow} />
            </LottieWrap>
          )}
        </CommentWrap>
        {reply.nickname === userData.nickname && (
          <>
            <ButtonWrap>
              <button onClick={onShowInputEdit}>
                <ReplyUpdate />
              </button>
              <button onClick={onShowModal}>
                <ReplyDelete />
              </button>
            </ButtonWrap>
          </>
        )}
      </Body>
      {showReply && <Recomment id={reply.commentId} />}
      {showModal && (
        <Modal onClickYes={handleDelreply} onClickNo={onCloseModal}>
          <p>정말로 삭제하시겠습니까?</p>
        </Modal>
      )}
    </>
  );
};

export default CommentList;

const Body = styled.div`
  display: flex;
  width: 100%;
  transition: all 0.5s ease-in-out;
  align-items: center;
`;

const LottieWrap = styled.div`
  position: relative;
  right: -3rem;
  top: -3rem;
  width: 25.5%;
  height: 50%;
`;

const ButtonWrap = styled.div`
  display: flex;
  & button {
    border: none;
  }
`;

const CommentWrap = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 1.6rem;
  gap: 0.8rem;
  height: 7rem;
  min-width: 90vw;

  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  color: #aaa;
  position: relative;
  top: 1.5rem;
`;

const Time = styled.div`
  padding-right: 1rem;
`;
const Write = styled.div`
  padding-right: 1rem;
`;

const CommentBody = styled.div`
  align-items: flex-start;
  gap: 0.2rem;
  height: 4.2rem;
  width: 70%;
`;

const Nick = styled.div`
  line-height: 1rem;
  font-family: "Anton";
  font-size: 1.1rem;
  font-weight: 700;
`;
