import { instance } from "../Utils/Instance";
import { useQuery } from "react-query";

const getUserData = async userId => {
  const { data } = await instance.get(`/api/user/info/${userId}`);
  return data;
};

export const useGetUserData = userId => {
  return useQuery(["userData", userId], () => getUserData(userId), {
    enabled: !!userId
  });
};
