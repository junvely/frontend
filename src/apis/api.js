import axios from "axios";
import { instance } from "./axios";

// 게시물 상세 조회 api, method : get, url : /api/posts/:postId
const detailRequest = async (postId) => {
  try {
    const response = await instance.get(`/api/posts/${postId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 댓글 조회 api, method : get, url : /api/posts/:postId/comments
const commentRequest = async (postId) => {
  try {
    const response = await instance.get(`/api/posts/${postId}/comments`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};
// 댓글 작성 api, method : post, url : /api/posts/:postId/comments
const commentSubmit = async ({ postId, comment }) => {
  try {
    const response = await instance.post(`/api/posts/${postId}/comments`, {
      comment,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 댓글 삭제api, method : delete, url : /api/user/{user_id}/comment/{id}
const commentDelete = async ({ postId, commentId }) => {
  console.log(commentId);
  try {
    const response = await instance.delete(
      `/api/posts/${postId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export { detailRequest, commentRequest, commentSubmit, commentDelete };
