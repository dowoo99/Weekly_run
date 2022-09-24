import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import imageCompression from "browser-image-compression";
import S3upload from "react-aws-s3";

import { S3config } from "../../Utils/S3Config";
import { instance } from "../../Utils/Instance";
import useQueryDebounce from "../../Hooks/useQueryDebounce";

import { ReactComponent as SmallCamera } from "../../Icons/sm-camera.svg";
import Profile from "../../Icons/SignUpProfile.svg";

window.Buffer = window.Buffer || require("buffer").Buffer;

function ProfileUpload({ userData }) {
  const [nickname, setNickname] = useState("");
  const [previewImage, setPrevieImage] = useState(Profile);
  const [image, setImage] = useState(null);
  const [isLodded, setIsLodded] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  const fileUpload = useRef(null);
  const navigate = useNavigate();

  const debounceNick = useQueryDebounce(nickname, 500);

  const onChangeNickName = e => {
    setDuplicate(false);
    const { value } = e.target;
    const onlyHangul = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");
    setNickname(onlyHangul);
  };

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };

  const chgPreview = async e => {
    const imageFile = e.target.files[0];
    const compressedFile = await imageCompression(imageFile, options);
    const imageUrl = URL.createObjectURL(compressedFile);
    setPrevieImage(imageUrl);
  };

  const submitImage = async () => {
    if (fileUpload.current.files[0]) {
      const ReactS3Client = new S3upload(S3config);
      let file = fileUpload.current.files[0];
      let newFileName = fileUpload.current.files[0].name;
      await ReactS3Client.uploadFile(file, newFileName)
        .then(data => {
          if (data.status === 204) {
            setImage(data.location);
          } else {
            window.alert("사진 업로드에 오류가 있어요! 관리자에게 문의해주세요.");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    setIsLodded(true);
  };

  //회원가입
  const signupUser = async () => {
    const { data } = await instance.post("/api/user/signup", {
      email: userData.email,
      nickname,
      image: image,
      provider: userData.provider
    });
    return data;
  };

  const { mutate: signUp } = useMutation(signupUser, {
    onSuccess: data => {
      const token = data.token;
      const userData = {
        email: data.email,
        image: data.image,
        nickname: data.nickname,
        userId: data.userId,
        provider: data.provider
      };
      window.localStorage.setItem("userData", JSON.stringify(userData));
      window.localStorage.setItem("token", token);
      navigate(`/user/${data.nickname}`);
    }
  });

  const onSubmitProfile = () => {
    submitImage();
  };

  useEffect(() => {
    if (isLodded) {
      signUp();
    }
  }, [isLodded]);

  //닉네임 중복 체크
  const nicknameCheck = async debounceNick => {
    const { data } = await instance.post(`/api/user/check?nickname=${debounceNick}`);
    return data;
  };

  const { mutate: duplicateCheck } = useMutation(nicknameCheck);

  useEffect(() => {
    if (debounceNick.length > 1) {
      duplicateCheck(debounceNick, {
        onSuccess: data => {
          if (data.duplicate) {
            setDuplicate("중복"); // 중복
          } else {
            setDuplicate("통과");
          }
        }
      });
    }
  }, [debounceNick]);

  return (
    <Body>
      <div>
        <label>
          <Image src={previewImage}></Image>
          <CameraIcon>
            <SmallCamera />
          </CameraIcon>
          <FileBox type="file" ref={fileUpload} onChange={chgPreview} />
        </label>
        <NickNameInput onChange={onChangeNickName} value={nickname} type="text" maxLength={5} minLength={2} />
        {duplicate !== "중복" ? (
          <NickForm>닉네임은 한글 2-5자 이내로 입력해주세요</NickForm>
        ) : (
          <NickForm style={{ color: "red" }}>이미 존재하는 닉네임입니다.</NickForm>
        )}
      </div>
      <JoinBtn onClick={onSubmitProfile} disabled={duplicate !== "통과"}>
        <p>가입하기</p>
      </JoinBtn>
    </Body>
  );
}

export default ProfileUpload;

const Body = styled.div`
  height: calc(100vh - 21rem);
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 16rem;
  height: 16rem;
  margin: 0rem 10.8rem 7.2rem;
`;

const FileBox = styled.input`
  display: none;
`;

const CameraIcon = styled.div`
  position: absolute;
  width: 4.8rem;
  left: 21.4rem;
  top: 34rem;
`;

const NickNameInput = styled.input`
  border: none;
  border-bottom: 0.1rem solid #e6e6e6;
  box-sizing: border-box;
  width: 21.4rem;
  height: 4.1rem;
  margin: 0 8rem 1.2rem;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const NickForm = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.7rem;
  text-align: center;
  color: #b3b3b3;
`;

const JoinBtn = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 9.7rem;
  background: #4d4d4d;
  & p {
    font-size: 2.4rem;
    text-align: center;
    color: #ffffff;
  }
  &:disabled {
    background: #b3b3b3;
  }
`;
