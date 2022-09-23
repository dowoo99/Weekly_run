import React, { useState, useCallback } from "react";
import styled from "styled-components";
import displayedAt from "../../Utils/displayAt";
import ReplyInput from "./ReplyInput";
import { useParams } from "react-router-dom";
import { ReactComponent as Profile } from "../../Icons/myPageProfile.svg";
import { useRecoilState } from "recoil";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";

function PostItem({ data }) {
  const [inputState, setInputState] = useRecoilState(replyState);

  const { id: postId } = useParams();

  const onShowInput = useCallback(e => {
    setInputState(prev => ({
      ...prev,
      showInput: "댓글작성",
      postId: postId
    }));
  });

  return (
    <>
      <PostBox>
        <div>{data.profile ? <img src={data.profile} /> : <Profile />}</div>
        <PostBody>
          <Nick>{data.nickname}</Nick>
          <div>{data.content}</div>
        </PostBody>
        <PostFooter>
          <Time>{displayedAt(data.createdAt)}</Time>
          <Like>좋아요{data.like}개</Like>
          <Write onClick={onShowInput}>답글달기</Write>
        </PostFooter>
      </PostBox>
      <ReplyInput />
    </>
  );
}
export default PostItem;

const PostBox = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 1.6rem;
  gap: 0.8rem;
  height: 7rem;
  border-bottom: 0.1rem solid #e6e6e6;
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 10rem;
  }
`;
const PostBody = styled.div`
  align-items: flex-start;
  gap: 0.2rem;
  height: 4.2rem;
  width: 29.7rem;
`;
const Nick = styled.div`
  line-height: 1rem;
  font-family: "Anton";
  font-size: 1.1rem;
  font-weight: 700;
`;
const PostFooter = styled.div`
  display: flex;
  width: 40rem;
  position: relative;
  right: 14.6rem;
  top: 3rem;
  color: #aaa;
  align-items: center;
`;
const Time = styled.div`
  padding-right: 1rem;
`;
const Like = styled.div`
  padding-right: 1rem;
`;
const Write = styled.div`
  color: #aaa;
  background-color: transparent;
`;
