import { instance } from "./axios";

// 유저 게시물 조회 api, method : get, url : /api/users/:userId
const userRequest = async (userId) => {
  try {
    const response = await instance.get(`/api/users/${userId}`);
    console.log(response);
    return response.data.page;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 유저 팔로우, api, method : get, url : /api/users/:userId/follow
const userFollow = async (userId) => {
  try {
    const response = await instance.put(`/api/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 유저 팔로우 조회, api, method : get, url : /api/users/:userId/follow
const followRequest = async (userId) => {
  try {
    const response = await instance.get(`/api/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};
// 유저 팔로워 조회, api, method : get, url : /api/users/:userId/follower
const followerRequest = async (userId) => {
  try {
    const response = await instance.get(`/api/users/${userId}/follower`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export { userRequest, userFollow, followRequest, followerRequest };
