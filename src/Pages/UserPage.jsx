import React, { useEffect } from "react";
import Layout from "../Components/Common/Layout";
import Userprofile from "../Components/Userpage/Userprofile";
import Progress from "../Components/Userpage/Progress";
import UserList from "../Components/Userpage/UserList";
import Goal from "../Components/Userpage/Goal";
import EventModal from "../Components/Common/EventModal";

import { useProgress } from "../Hooks/useProgress";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { instance } from "../Utils/Instance";

const UserPage = () => {
  const { nickname } = useParams();
  const { state } = useLocation();
  const [showEventModal, setShowEventModal] = useState(true);
  const accessToken = localStorage.getItem("userData");
  const parseData = JSON.parse(accessToken);
  const userNickname = parseData.nickname;
  const userProfile = parseData.image;
  const userId = parseData.userId;

  const [userIds, SetUserId] = useState(state?.userId || userId);

  const { data: goalData } = useProgress(userIds); //user 목표보여주기

  useEffect(() => {
    if (state?.userId === undefined) {
      return SetUserId(userId);
    }
  }, [state?.userId]);

  useEffect(() => {
    async function getShowEvent() {
      const res = await instance.get("/api/user/research");
      setShowEventModal(res.data?.result);
    }
    getShowEvent();
  }, []);

  return (
    <>
      {!showEventModal && <EventModal />}
      <Layout>
        <Userprofile userProfile={userProfile} goalData={goalData} userNickname={userNickname}></Userprofile>
        {goalData?.result ? (
          <Progress done={goalData?.result} goalData={goalData}></Progress>
        ) : (
          <Goal done={goalData?.result} userNickname={userNickname}></Goal>
        )}
        <UserList></UserList>
      </Layout>
    </>
  );
};

export default UserPage;
