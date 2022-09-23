import { instance } from "../Utils/Instance";
import { useQuery } from "react-query";

const fetchNodeList = async userId => {
  // if (!userId) return;
  const { data } = await instance.get(`/api/user/${userId}`);
  return data;
};

export const useProgress = userId => {
  return useQuery(["userGoal", userId], () => fetchNodeList(userId), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!userId
  });
};
