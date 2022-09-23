import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { instance } from "../../Utils/Instance";
import Loading from "../Common/Loading/Loading";

const NaverSignup = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const code = location.search.split("=")[1];
  const state = location.search.split("=")[2];

  const naverLogin = async () => {
    const res = await instance.get(`/api/naver/callback?code=${code}`).then(res => {
      const token = res.data.token;
      const userData = {
        email: res.data.email,
        image: res.data.image,
        nickname: res.data.nickname,
        userId: res.data.userId,
        provider: res.data.provider
      };

      if (token) {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userData", JSON.stringify(userData));
        navigate(`/user/${res.data.nickname}`, {
          state: {
            userId: ""
          }
        });
      } else {
        navigate("/signup", {
          state: {
            email: res.data.email,
            provider: res.data.provider
          }
        });
      }
    });
    return res;
  };

  const userData = JSON.parse(window.localStorage.getItem("userData")) || null;

  useEffect(() => {
    if (userData) {
      navigate(`/user/${userData.nickname}`);
    } else {
      naverLogin();
    }
  }, []);

  return <></>;
};

export default NaverSignup;
