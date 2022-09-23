import { useMutation, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";
const postGood = async postId => {
  return await instance.put(`/api/like/${postId}`);
};
export const useLikeCheck = () => {
  const queryClient = useQueryClient();
  return useMutation(postGood, {
    onSuccess: data => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("like");
    },
    onError: error => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error);
    }
  });
};
