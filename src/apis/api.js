import axios from "axios";

// 게시물 상세 조회 api, method : get, url : /api/posts/:postId
const detailRequest = async ({ postId, authorization }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/main/${postId}`,
      {
        headers: {
          Authorization: `${authorization}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 댓글 조회 api, method : get, url : /api/posts/:postId/comments
const commentRequest = async (postId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/main/${postId}/comments`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};
// 댓글 작성 api, method : post, url : /api/posts/:postId/comments
const commentSubmit = async ({ postId, comment, authorization }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/main/${postId}/comments`,
      { comment },
      {
        headers: {
          Authorization: `${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 댓글 삭제api, method : delete, url : /api/user/{user_id}/comment/{id}
const commentDelete = async ({ postId, commentId, authorization }) => {
  console.log(commentId, authorization);
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/main/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export { detailRequest, commentRequest, commentSubmit, commentDelete };
