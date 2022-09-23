import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";

import useInput from "../../Hooks/useInput";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";
import { addReply } from "../../Hooks/useReply";
import { editReply } from "../../Hooks/useReply";
import { addRecomment } from "../../Hooks/useRecomment";
import { editRecomment } from "../../Hooks/useRecomment";
import Modal from "../Common/Modal/Modal";

const ReplyInput = () => {
  const inputRef = useRef(null);
  const [replyValue, onChangeReplyValue, setReplyValue] = useInput("");
  const [inputState, setInputState] = useRecoilState(replyState);
  const { showInput, postId, recommentId } = inputState;

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  //댓글 작성
  const addReplyData = useMutation(reply => addReply(reply), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
      queryClient.invalidateQueries("posts");
      setInputState(prev => ({
        ...prev,
        showInput: false
      }));
    },
    onError: error => {
      console.error(error);
    }
  });
  //댓글 수정
  const editReplyData = useMutation(reply => editReply(reply), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
      setInputState(prev => ({
        ...prev,
        showInput: false
      }));
    },
    onError: error => {
      console.error(error);
    }
  });

  //대댓글 작성
  const addRecommnetData = useMutation(reply => addRecomment(reply), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
      queryClient.invalidateQueries("GET_RECOMMENT");
      setInputState(prev => ({
        ...prev,
        showInput: false
      }));
    },
    onError: error => {
      console.error(error);
    }
  });

  //대댓글 수정
  const editRecommentData = useMutation(reply => editRecomment(reply), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_RECOMMENT");
      setInputState(prev => ({
        ...prev,
        showInput: false
      }));
    },
    onError: error => {
      console.error(error);
    }
  });

  const handleAddreply = e => {
    e.preventDefault();
    switch (showInput) {
      case "댓글작성":
        addReplyData.mutate({ comment: replyValue, postId: postId });
        break;
      case "댓글수정":
        editReplyData.mutate({ comment: replyValue, commentId: postId });
        break;
      case "대댓글작성":
        addRecommnetData.mutate({
          commentId: postId,
          comment: replyValue
        });
        break;
      case "대댓글수정":
        editRecommentData.mutate({ comment: replyValue, commentId: postId, recommentId: recommentId });
        break;
    }
    setReplyValue("");
  };

  const onCloseInput = useCallback(e => {
    setInputState(prev => ({
      ...prev,
      showInput: false
    }));
  }, []);

  if (!showInput) {
    return null;
  }

  return (
    <>
      <form onSubmit={handleAddreply}>
        <InputWrap>
          <div>
            <input ref={inputRef} value={replyValue} onChange={onChangeReplyValue} />
            <span onClick={onCloseInput}>&times;</span>
          </div>
        </InputWrap>
      </form>
    </>
  );
};

export default ReplyInput;

const InputWrap = styled.div`
  position: fixed;
  bottom: 7rem;
  background: #353434;
  width: 100%;
  height: 5.4rem;

  & div {
    display: flex;
    padding: 0.7rem 1.6rem;
  }
  & input {
    width: 80%;
    height: 4rem;
    border-radius: 0.8rem;
    background-color: #d9d9d9;
    padding: 0 1rem;
    border: none;
    &:focus {
      outline: none;
    }
  }
  & span {
    width: 20%;
    color: white;
    text-align: center;
    font-size: 2.6rem;
    line-height: 2.9rem;
  }
  @media only screen and (min-width: 880px) {
    max-width: 40rem;
  }
`;
