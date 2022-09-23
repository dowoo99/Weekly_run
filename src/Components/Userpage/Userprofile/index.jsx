import React from "react";

import { StyleUserWrap, StyleUser, StyleHeader, StyleUsrBox, RankLink, UserTitle } from "./style";

import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import { useParams, Link } from "react-router-dom";
import { ReactComponent as Option } from "../../../Icons/option.svg";

import { ReactComponent as Profile } from "../../../Icons/myPageProfile.svg";

import TrophyIcon from "../../../Icons/trophy.png";

const Userprofile = ({ userNickname, goalData, userProfile }) => {
  const { nickname } = useParams();
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);

  const [naveState, setNaveState] = useRecoilState(NavStates);

  return (
    <StyleUserWrap>
      <StyleUser>
        {nickname === userNickname ? (
          <>
            <StyleHeader>
              <div>
                <span>마이페이지</span>

                <Option
                  onClick={() => {
                    setShow(3);
                    setNaveState("option");
                  }}
                ></Option>
              </div>
            </StyleHeader>
            <StyleUsrBox>
              <div>
                {goalData?.getUserInfo?.profile ? (
                  <img
                    onClick={() => {
                      setNavState("img");
                      setShow(2);
                    }}
                    style={{ width: "40px", height: "40px", borderRadius: "20px" }}
                    src={goalData?.getUserInfo.profile || userProfile}
                  ></img>
                ) : (
                  <Profile
                    onClick={() => {
                      setNavState("img");
                      setShow(2);
                    }}
                  ></Profile>
                )}
              </div>

              <UserTitle>

               {nickname}님의 주간 목표
                <RankLink to="/rank">
                  <img src={TrophyIcon} />
                </RankLink>
              </UserTitle>
            </StyleUsrBox>
          </>
        ) : (
          <>
            <StyleUsrBox>
              <div>
                {goalData?.getUserInfo?.profile ? (
                  <img
                    style={{ width: "40px", height: "40px", borderRadius: "20px" }}
                    src={goalData.getUserInfo.profile}
                  ></img>
                ) : (
                  <Profile></Profile>
            
                )}
              </div>

              <UserTitle>
                {nickname}님의 주간 목표
                <RankLink to="/rank">
                  <img src={TrophyIcon} />
                </RankLink>
              </UserTitle>
            </StyleUsrBox>
          </>
        )}
      </StyleUser>
    </StyleUserWrap>
  );
};
export default Userprofile;
