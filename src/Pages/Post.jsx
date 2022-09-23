import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { postData } from "../Recoil/Atoms/PostData";
import KakaoMap from "../Components/Common/KakaoMap";
import Hashtag from "../Components/PostPage/Hashtag";
import AddPhoto from "../Components/PostPage/AddPhoto";
import AddContent from "../Components/PostPage/AddContent";
import { instance } from "../Utils/Instance";
import Modal from "../Components/Common/Modal/Modal";
import Loading from "../Components/Common/Loading/Loading";

import { ReactComponent as BackIcon } from "../Icons/BackIcon.svg";

const Post = () => {
  const [merge, setMerge] = useState(false);
  const [post, setPost] = useRecoilState(postData);
  const [showModal, setShowModal] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const { id: postId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const { runLog } = location.state;
  const Time = runLog.time;

  const addPosts = async () => {
    if (!postId) {
      const { data } = await instance.post("/api/post", post);
      return data;
    } else {
      const { data } = await instance.put(`/api/post/${postId}`, post);
      return data;
    }
  };

  const onShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickSubmit = useCallback(() => {
    setPost(prev => ({
      ...prev,
      distance: runLog.distance,
      path: runLog.path,
      time: Time,
      isLoading: true
    }));
    setMerge(true);
    setPostLoading(true);
  }, [merge, post]);

  useEffect(() => {
    if (!post.isLoading && merge) {
      addPosts();
      const LoadingScreen = setTimeout(() => {
        setPostLoading(false);
        navigate("/feed");
      }, 2000);
      return () => clearTimeout(LoadingScreen);
    }
  }, [post, merge]);

  return (
    <>
      {postLoading && <Loading>게시물을 업로드하고 있어요</Loading>}
      <PostHeader>
        <HeaderItems>
          <div
            onClick={() => {
              navigate("/feed");
            }}
          >
            <BackIcon />
          </div>
          <div>글쓰기</div>
          <div onClick={onShowModal}>완료</div>
        </HeaderItems>
      </PostHeader>
      <PostBody>
        <PostMap>
          <KakaoMap path={runLog.path} />
        </PostMap>
        <AddPhoto merge={merge} prevImg={runLog.image} />
        <AddContent merge={merge} prevContent={runLog.content} />
        <Hashtag merge={merge} prevHashtag={runLog.hashtag} />
      </PostBody>
      {showModal && (
        <Modal onClickNo={onCloseModal} onClickYes={onClickSubmit}>
          <p>{postId ? "수정하시겠어요?" : "작성하시겠어요?"}</p>
        </Modal>
      )}
    </>
  );
};

export default Post;

const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0rem;

  height: 4.3rem;
`;

const HeaderItems = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  width: 100%;
  border-bottom: 0.1rem solid #e6e6e6;
  & div {
    font-family: "Noto Sans CJK KR";
    font-size: 1.6rem;
    line-height: 2.3rem;
  }
  & > div:last-child {
    color: #f03800;
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
`;

const PostMap = styled.div`
  padding: 2rem 2rem 0rem;
  width: 35.2rem;
`;
