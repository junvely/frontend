import { instance } from "../axios";

const loginAxios = async (payload) => {
  try {
    const { data } = await instance.post("/api/login", payload);
    return data;
  } catch (error) {
    // alert(error.errorMessage);
    throw error;
  }
};

const tokenVerifyAxios = async () => {
  try {
    await instance.post("/api/verify");
  } catch (error) {
    throw error;
  }
};

export { loginAxios, tokenVerifyAxios };
