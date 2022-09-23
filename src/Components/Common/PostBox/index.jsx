import React, { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { NavState, NavStates, NavPostData } from "../../../Recoil/Atoms/OptionAtoms";
import {
  StyleFeed,
  StyleFrofileBox,
  StyleFrofileImg,
  StyleFrofile,
  StylePath,
  StyleContentBox,
  StyleIcon,
  StyleHeart,
  StyleSpeed,
  StyleGood,
  StyleImg,
  StyleHashBox,
  StyleContent,
  StyleHash,
  StyleComment,
  StyleTime
} from "./style";

import { ReactComponent as Heart } from "../../../Icons/heart.svg";
import { ReactComponent as CommentIcon } from "../../../Icons/comment.svg";

import { ReactComponent as Profile } from "../../../Icons/myPageProfile.svg";

import displayedAt from "../../../Utils/displayAt";
import KakaoMap from "../../Common/KakaoMap/index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLikeCheck } from "../../../Hooks/useLikecheck";
const PostBox = ({ posts, index }) => {
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNaveState] = useRecoilState(NavStates);
  const [postData, setPostData] = useRecoilState(NavPostData);
  const { mutate } = useLikeCheck();
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;

  const divideTime = useCallback(time => {
    let seconds = time.second;
    let minute = time.minute;
    let hours = time.hour;

    hours = hours < 10 ? "0" + hours : hours;
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minute + ":" + seconds;
  }, []);

  const linkToReply = useCallback(() => {
    navigate(`/reply/${posts.postId}`, {
      state: {
        nickname: posts.nickname,
        profile: posts.profile,
        content: posts.content,
        createdAt: posts.createdAt,
        like: posts.like
      }
    });
  }, []);

  const linkToSearch = useCallback(hash => {
    navigate("/search", {
      state: hash
    });
  }, []);

  console.log(posts);

  return (
    <StyleFeed key={index}>
      <StyleFrofileBox>
        <StyleFrofile>
          {posts.profile === null ? (
            <Profile
              onClick={() => {
                setPostData(posts);
                navigate(`/user/${posts.nickname}`, {
                  state: { userId: posts.userId }
                });
              }}
            />
          ) : (
            <StyleFrofileImg
              onClick={() => {
                setPostData(posts);
                navigate(`/user/${posts.nickname}`, {
                  state: { userId: posts.userId }
                });
              }}
              src={posts.profile}
            ></StyleFrofileImg>
          )}
          <div></div>
          <span>{posts.nickname}</span>
        </StyleFrofile>
        <div style={{ display: "flex" }}>
          {nickname === posts.nickname ? (
            <div
              onClick={() => {
                setShow(2);
                setNaveState("put");
                setPostData(posts);
              }}
            >
              ...
            </div>
          ) : (
            <div
              onClick={() => {
                setShow(1);
                setNaveState("report");
                setPostData(posts.postId);
              }}
            >
              ...
            </div>
          )}
        </div>
      </StyleFrofileBox>
      <StylePath>
        <Swiper
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <StyleSpeed>
              <div>
                <div>{posts.distance}Km</div>
                <div>{divideTime(posts.time)}</div>
              </div>
            </StyleSpeed>
            <KakaoMap path={posts.path}></KakaoMap>
          </SwiperSlide>
          {posts.image.map((img, index) => (
            <SwiperSlide key={index}>
              <StyleImg src={img} alt="img"></StyleImg>
            </SwiperSlide>
          ))}
        </Swiper>
      </StylePath>
      <StyleContentBox>
        <StyleIcon>
          <StyleHeart>
            {posts.likeDone ? (
              <Heart
                fill="red"
                onClick={e => {
                  mutate(posts.postId);
                }}
              />
            ) : (
              <Heart
                stroke="black"
                onClick={e => {
                  mutate(posts.postId);
                }}
              />
            )}
            <CommentIcon
              onClick={() => {
                navigate(`/reply/${posts.postId}`, {
                  state: {
                    nickname: posts.nickname,
                    profile: posts.profile,
                    content: posts.content,
                    createdAt: posts.createdAt,
                    like: posts.like
                  }
                });
              }}
            />
          </StyleHeart>
        </StyleIcon>
        <StyleContent>{posts?.content}</StyleContent>
        <StyleHashBox>
          {posts?.hashtag.map((hash, idx) => (
            <StyleHash key={idx} onClick={() => linkToSearch(hash)}>
              <span>#{hash}</span>
            </StyleHash>
          ))}
        </StyleHashBox>
        <StyleGood>
          좋아요
          {posts.like}개
        </StyleGood>
        <StyleComment>
          {posts.commentNum > 0 && <div onClick={linkToReply}>댓글{posts.commentNum}개 모두보기</div>}
        </StyleComment>
        <StyleTime>{displayedAt(posts.createdAt)}</StyleTime>
      </StyleContentBox>
    </StyleFeed>
  );
};
export default PostBox;
