import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";

const putGoal = async goal => {
  return await instance.put(`/api/user/goal`, goal);
};
export const usePutGoal = () => {
  const queryClient = useQueryClient();
  return useMutation(putGoal, {
    onSuccess: data => {
      queryClient.invalidateQueries("userGoal"); // mutation 이 성공하면 response를 받을 수 있다.
    },
    onError: error => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    }
  });
};
