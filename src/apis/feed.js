import { instance } from "./axios";

const getMainPostsAxios = async () => {
  try {
    const { data } = await instance.get("/api/posts");
    alert("포스트 가져오기 성공");
    return data.data;
  } catch (error) {
    // alert(error.errorMessage);
    throw error;
  }
};

const putLikeAxios = async (id) => {
  try {
    const { data } = await instance.get(`/api/posts/:${id}/like`);
    return data.data;
  } catch (error) {
    // alert(error.errorMessage);
    throw error;
  }
};

export { getMainPostsAxios, putLikeAxios };
