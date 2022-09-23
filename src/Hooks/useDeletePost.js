import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { instance } from "../Utils/Instance";
const deletePost = async postId => {
  return await instance.delete(`/api/post/${postId}`);
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePost, {
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
