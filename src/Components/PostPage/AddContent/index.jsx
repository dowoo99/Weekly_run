import React, { useRef, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import useInput from "../../../Hooks/useInput";
import { postData } from "../../../Recoil/Atoms/PostData";

const AddContent = ({ merge, prevContent }) => {
  const [content, onChangeContent] = useInput(prevContent || "");

  const [post, setPost] = useRecoilState(postData);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (textRef.current !== null) textRef.current.focus();
  });

  useEffect(() => {
    if (merge) {
      setPost(prev => ({
        ...prev,
        content
      }));
    }
  }, [merge]);

  return (
    <ContentBox>
      <Write value={content} ref={textRef} onChange={onChangeContent}></Write>
    </ContentBox>
  );
};

export default AddContent;

const ContentBox = styled.div`
  padding: 2rem 1.6rem;
  height: 22rem;
`;

const Write = styled.textarea`
  background: #e6e6e6;
  border-radius: 0.4rem;
  padding: 1rem 0 1rem 1rem;
  gap: 1rem;
  width: 34.3rem;
  height: 18rem;
  &:focus {
    outline: none;
  }
`;
