import React, { useEffect } from "react";
import RankHeader from "../Components/Rank/RankHeader";
import RankBody from "../Components/Rank/RankBody";
import { useQuery } from "react-query";
import { instance } from "../Utils/Instance";

const Rank = () => {
  const getRanking = async () => {
    const { data } = await instance.get("/api/user/rank");
    return data;
  };

  const { data } = useQuery("getRank", getRanking);

  return (
    <>
      <RankHeader />
      <RankBody rankData={data} />
    </>
  );
};

export default Rank;
