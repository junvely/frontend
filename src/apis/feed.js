import { instance } from "./axios";

const getMainPostsAxios = async () => {
  try {
    const { data } = await instance.get("/api/main");
    return data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    console.log(errorMessage);
    throw error;
  }
};

const getRandomPostsAxios = async () => {
  try {
    const { data } = await instance.get("/api/postsrandom");
    return data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    console.log(errorMessage);
    throw error;
  }
};

const isLikeAxios = async (id) => {
  console.log(id);
  try {
    const { data } = await instance.put(`/api/posts/${id}/like`);
    return data.data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

export { getMainPostsAxios, isLikeAxios, getRandomPostsAxios };
