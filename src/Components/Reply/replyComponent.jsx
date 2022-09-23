import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

import useInfinityScroll from "../../Hooks/useInfinityScroll";
import { instance } from "../../Utils/Instance";
import ReplyInput from "./ReplyInput";
import CommentList from "./CommentList";
import Nav from "../Common/Nav/index";

function ReplyComponent() {
  const [showInput, setShowInput] = useState(false);
  const [recommentKey, setRecommentKey] = useState("");

  const { id: postId } = useParams();

  //댓글조회
  const getReply = async pageParam => {
    const res = await instance.get(`/api/comment/${postId}/${pageParam}`);
    const { Comment, isLast } = res.data;
    return { Comment, nextPage: pageParam + 1, isLast };
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfinityScroll("GET_REPLY", getReply);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  const onCloseInput = useCallback(() => {
    setShowInput(false);
  }, []);

  return (
    <>
      <ReplyBox>
        {data?.pages.map((data, i) => {
          return (
            <React.Fragment key={i}>
              {data?.Comment?.map((reply, idx) => {
                return (
                  <div key={idx}>
                    <CommentList reply={reply} setShowInput={setShowInput} setRecommnetKey={setRecommentKey} />
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
        <ReplyInput onCloseInput={onCloseInput} showInput={showInput} postId={recommentKey} />
      </ReplyBox>
      {isFetchingNextPage ? <></> : <div ref={ref}></div>}

      <Nav />
    </>
  );
}

export default ReplyComponent;

const ReplyBox = styled.div`
  width: 100%;
  margin-bottom: 6rem;
`;
