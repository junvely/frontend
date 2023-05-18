import { instance } from "../axios";

const loginAxios = async (payload) => {
  try {
    const { data } = await instance.post("/api/auth/login", payload);
    return data;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

const tokenVerifyAxios = async () => {
  try {
    await instance.post("/api/auth/rtVerify");
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    console.log(errorMessage);
    throw error;
  }
};

export { loginAxios, tokenVerifyAxios };
