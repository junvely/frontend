import { instance } from "./axios";

const postAdd = async (postData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await instance.post("/api/posts", postData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postUser = async () => {
  try {
    const response = await instance.get("/api/posts");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { postAdd, postUser };
