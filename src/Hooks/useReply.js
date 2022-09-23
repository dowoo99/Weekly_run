import { instance } from "../Utils/Instance";

//댓글 부분
export const addReply = async ({ comment, postId }) => {
  try {
    const response = await instance.post(`/api/comment/${postId}`, {
      comment: comment
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const delReply = async id => {
  try {
    const response = await instance.delete(`/api/comment/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editReply = async ({ comment, commentId }) => {
  try {
    const response = await instance.put(`/api/comment/${commentId}`, { comment: comment });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
