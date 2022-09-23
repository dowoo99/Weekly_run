import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";

const postGoal = async goal => {
  return await instance.post(`/api/user/goal`, goal);
};
export const useGoal = () => {
  const queryClient = useQueryClient();
  return useMutation(postGoal, {
    onSuccess: data => {
      queryClient.invalidateQueries("userGoal"); // mutation 이 성공하면 response를 받을 수 있다.
    },
    onError: error => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    }
  });
};
