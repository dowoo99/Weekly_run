import { instance } from "../Utils/Instance";

//대댓글
export const addRecomment = async ({ comment, commentId }) => {
  try {
    const { data } = await instance.post(`/api/comment/recomment/${commentId}`, {
      comment
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const delRecomment = async id => {
  const response = await instance.delete(`/api/comment/${id.commentId}/${id.recommentId}`);
  return response.data;
};

export const editRecomment = async ({ comment, recommentId, commentId }) => {
  try {
    const response = await instance.put(`/api/comment/${commentId}/${recommentId}`, {
      comment: comment
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
