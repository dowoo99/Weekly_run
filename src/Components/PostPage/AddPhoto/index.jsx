import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import S3upload from "react-aws-s3";
import imageCompression from "browser-image-compression";

import { postData } from "../../../Recoil/Atoms/PostData";
import { useRecoilState } from "recoil";
import { S3config } from "../../../Utils/S3Config";

import { ReactComponent as PostCamera } from "../../../Icons/PostCamera.svg";

window.Buffer = window.Buffer || require("buffer").Buffer;

const AddPhoto = ({ merge, prevImg }) => {
  const [previewImages, setPreviewImages] = useState(prevImg || []);
  const [uploadImages, setUploadImages] = useState(prevImg || []);
  const [post, setPost] = useRecoilState(postData);
  const imgRef = useRef();

  // 이미지 업로드 로직
  const onSubmitImg = async () => {
    const length = imgRef.current.files.length;
    if (length > uploadImages) {
      const ReactS3Client = new S3upload(S3config);
      for (let i = 0; i < length; i++) {
        await ReactS3Client.uploadFile(imgRef.current.files[i], imgRef.current.files[i].name)
          .then(data => {
            uploadImages.push(data.location);
          })
          .catch(error => console.error(error));
      }
    }
    setPost(prev => ({
      ...prev,
      image: uploadImages,
      isLoading: false
    }));
  };

  const onChangeImg = async () => {
    if (previewImages.length >= 5) {
      return null;
    }
    const imgArray = imgRef.current.files;
    let imgUrls = [...previewImages];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 720,
      useWebWorker: true
    };
    try {
      for (let i = 0; i < imgArray.length; i++) {
        const comporessedFile = await imageCompression(imgArray[i], options);
        const imgUrl = URL.createObjectURL(comporessedFile);
        imgUrls.push(imgUrl);
      }
    } catch (error) {
      console.error(error);
    }
    setPreviewImages(imgUrls);
  };

  const deletePhoto = idx => {
    setPreviewImages(previewImages.filter((_, index) => index !== idx));
    setUploadImages(uploadImages?.filter((_, index) => index !== idx));
    const dataTranster = new DataTransfer();
    Array.from(imgRef.current.files)
      .filter((_, index) => index !== idx)
      .forEach(file => {
        dataTranster.items.add(file);
      });
    imgRef.current.files = dataTranster.files;
  };

  useEffect(() => {
    if (merge) {
      onSubmitImg();
    }
  }, [merge]);

  return (
    <PhotoWrap>
      <AddButton>
        <input ref={imgRef} type="file" multiple onChange={onChangeImg} />
        <PostCamera />
        <div>{previewImages.length}/5</div>
      </AddButton>
      {previewImages &&
        previewImages.map((img, idx) => {
          return (
            <AddButton key={idx}>
              <PreviewImges src={img} alt="첨부한 이미지" onClick={() => deletePhoto(idx)} />
            </AddButton>
          );
        })}
    </PhotoWrap>
  );
};

export default AddPhoto;

const PhotoWrap = styled.div`
  padding: 2rem 1.6rem;
  display: flex;
  gap: 2rem;
  border-bottom: 0.1rem solid #e6e6e6;
  width: inherit;
  flex-wrap: nowrap;
  max-width: 34.3rem; ;
`;

const AddButton = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  min-width: 6.4rem;
  height: 6.4rem;
  background: #ffffff;
  border: 0.1rem solid #cccccc;
  border-radius: 0.4rem;
  & input {
    display: none;
  }
  & div {
    width: 2.5rem;
    height: 1.7rem;
    color: #999999;
    font-family: "Noto Sans CJK KR";
  }
`;

const PreviewImges = styled.img`
  width: 6.4rem;
  height: 6.4rem;
`;
