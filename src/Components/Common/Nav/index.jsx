import React, { useRef, useState } from "react";
import { StyleNav, StyleShow, StyleButton, StyleShowBackgroud } from "./style";
import { NavState, PreviewImg, NavStates, NavPostData } from "../../../Recoil/Atoms/OptionAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReactComponent as Home } from "../../../Icons/home.svg";
import { ReactComponent as Search } from "../../../Icons/search.svg";
import { ReactComponent as Run } from "../../../Icons/run.svg";
import { ReactComponent as Mypage } from "../../../Icons/mypage.svg";
import { ReactComponent as RightSearch } from "../../../Icons/searchRight.svg";

import { useUserProfileMutation } from "../../../Hooks/useProfile";
import S3upload from "react-aws-s3";
import { instance } from "../../../Utils/Instance";
import { useNavigate, useLocation } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useDeletePost } from "../../../Hooks/useDeletePost";
import { S3config } from "../../../Utils/S3Config";
window.Buffer = window.Buffer || require("buffer").Buffer;
const Nav = () => {
  const { state } = useLocation();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: postProfile } = useUserProfileMutation();
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState(NavState);
  const [preview, setPreview] = useRecoilState(PreviewImg);
  const navEvent = useRecoilValue(NavStates);
  const postData = useRecoilValue(NavPostData);
  const imgVal = useRef(null);
  const [submit, setSubmit] = useState({
    image: ""
  });
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;
  const provider = parseData.provider;
  const userId = parseData.userId;
  const submitImg = async () => {
    let file = imgVal.current.files[0];
    let newFileName = imgVal.current.files[0].name;
    const compressedFile = await imageCompression(file, options);
    const ReactS3Client = new S3upload(S3config);
    ReactS3Client.uploadFile(compressedFile, newFileName).then(async data => {
      if (data.status === 204) {
        let imgUrl = data.location;
        const newimg = { ...submit, image: imgUrl };
        postProfile(newimg);
      } else {
        window.alert("?????? ???????????? ????????? ?????????! ??????????????? ??????????????????.");
      }
    });
  };
  const onChangeImg = e => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setPreview(imageUrl);
    submitImg();
  };

  const kakaoLogout = async () => {
    const { data } = await instance.get("/api/kakao/logout");
    return data;
  };

  const naverLogout = async () => {
    window.location.href = "http://nid.naver.com/nidlogin.logout";
    window.location.href = "http://localhost:3000";
  };

  const logoutConfirm = () => {
    if (confirm("??????????????????????????????")) {
      if (provider === "kakao") {
        kakaoLogout();
      } else if (provider === "naver") {
        naverLogout();
      }
      localStorage.clear();
      navigate("/");
    } else {
      return;
    }
  };

  const userDelete = async () => {
    const { data } = await instance.delete("/api/user").then(() => {
      localStorage.clear();
    });

    return data;
  };

  const outConfirm = () => {
    if (confirm("??????????????????????????????")) {
      userDelete();
      alert("???????????????????????????");
      navigate("/");
    } else {
      return;
    }
  };
  const DeleteConfirm = () => {
    if (confirm("???????????????????????????????")) {
      return deletePost(postData.postId);
    } else {
      return;
    }
  };

  return (
    <>
      <StyleNav>
        <StyleShowBackgroud Show={show}></StyleShowBackgroud>

        {
          {
            option: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    navigate("/bugreport");
                  }}
                >
                  ?????? ????????????
                </p>
                <p
                  onClick={() => {
                    logoutConfirm();
                  }}
                >
                  ????????????
                </p>
                <p
                  style={{ color: "red" }}
                  onClick={() => {
                    outConfirm();
                  }}
                >
                  ????????????
                </p>
              </StyleShow>
            ),
            img: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    setPreview(null);
                    postProfile({ image: null });
                  }}
                >
                  ??????????????????????????????
                </p>
                <div>
                  <label htmlFor="inputFile">???????????? ??????????????????</label>
                  <input
                    style={{ display: "none" }}
                    onChange={onChangeImg}
                    id="inputFile"
                    type="file"
                    accept="image/*"
                    ref={imgVal}
                  ></input>
                </div>
              </StyleShow>
            ),
            put: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    navigate(`/post/${postData.postId}`, {
                      state: { runLog: postData }
                    });
                  }}
                >
                  ????????????
                </p>
                <p
                  onClick={() => {
                    DeleteConfirm();
                  }}
                >
                  ????????????
                </p>
              </StyleShow>
            ),
            report: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    navigate("/postreport", {
                      state: { postId: postData }
                    });
                  }}
                  style={{ color: "red" }}
                >
                  ????????????
                </p>
              </StyleShow>
            )
          }[navEvent]
        }

        <StyleButton>
          <div>
            {state === "feed" ? (
              <div>
                <Home
                  stroke="white"
                  onClick={() => {
                    navigate("/feed", { state: "feed" });
                  }}
                />
              </div>
            ) : (
              <div>
                <Home
                  onClick={() => {
                    navigate("/feed", { state: "feed" });
                  }}
                  stroke="#808080"
                />
              </div>
            )}
            {state === "search" ? (
              <div>
                <Search
                  onClick={() => {
                    navigate("/search", { state: "search" });
                  }}
                  stroke="white"
                />
              </div>
            ) : (
              <div>
                <Search
                  onClick={() => {
                    navigate("/search", { state: "search" });
                  }}
                  stroke="#808080"
                />
              </div>
            )}
            <div>
              <Run
                onClick={() => {
                  navigate("/record");
                }}
              />
            </div>
            {state === "user" ? (
              <div>
                <Mypage
                  stroke="#D9D9D9"
                  onClick={() => {
                    navigate(`/user/${nickname}`, { state: "user" });
                  }}
                />
              </div>
            ) : (
              <div>
                <Mypage
                  stroke="#808080"
                  onClick={() => {
                    navigate(`/user/${nickname}`, { state: "user" });
                  }}
                />
              </div>
            )}
          </div>
        </StyleButton>
      </StyleNav>
    </>
  );
};

export default Nav;
