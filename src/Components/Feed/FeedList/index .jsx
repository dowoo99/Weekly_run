import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StyleFeedWrap, StyleFilter, StyleNewSpan, StyleLikeSpan, Banner } from "./style";
import LikeList from "../LikeList/index";
import MainList from "../MainList/index";
import { useState } from "react";

import BannerImage from "../../../Icons/eventBanner.jpeg";

const googleForms =
  "https://docs.google.com/forms/d/e/1FAIpQLSdZDs9en5KjtUB_eSl19kfMrvtTITl31Y57J7au95ZPUkZ2SQ/viewform?usp=sf_link";

const UserfeedList = () => {
  const [filter, setFilter] = useState(false);
  const { state } = useLocation();

  return (
    <StyleFeedWrap>
      <Banner>
        <a target="_blank" href={googleForms}>
          <img src={BannerImage} alt="리뷰 이벤트" />
        </a>
      </Banner>
      <StyleFilter>
        <p>게시글</p>
        <div>
          <StyleNewSpan
            Filter={filter}
            tabIndex={-1}
            onClick={() => {
              setFilter(false);
            }}
          >
            최신
          </StyleNewSpan>

          <StyleLikeSpan
            Filter={filter}
            tabIndex={-1}
            onClick={() => {
              setFilter(true);
            }}
          >
            인기
          </StyleLikeSpan>
        </div>
      </StyleFilter>

      {filter ? <LikeList></LikeList> : <MainList></MainList>}
    </StyleFeedWrap>
  );
};
export default UserfeedList;
