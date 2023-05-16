import axios from "axios";

// 유저 게시물 조회 api, method : get, url : /api/users/:userId
const userRequest = async ({ userId, authorization }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${userId}`,
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

// 유저 팔로우, api, method : get, url : /api/users/:userId/follow
const userFollow = async ({ userId, authorization }) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${userId}/follow`,
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

// 유저 팔로우 조회, api, method : get, url : /api/users/:userId/follow
const followRequest = async ({ userId, authorization }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${userId}/follow`,
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
// 유저 팔로워 조회, api, method : get, url : /api/users/:userId/follower
const followerRequest = async ({ userId, authorization }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${userId}/follower`,
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

export { userRequest, userFollow, followRequest, followerRequest };
