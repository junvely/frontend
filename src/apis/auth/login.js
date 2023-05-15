import { instance, verifyInstance } from "../axios";

const loginAxios = async (payload) => {
  try {
    await instance.post("/api/login", payload);
    alert("로그인 성공");
  } catch (error) {
    alert(error.errorMessage);
    throw error;
  }
};

const tokenVerifyAxios = async () => {
  try {
    await verifyInstance.post("/api/verify");
  } catch (error) {
    throw error;
  }
};

export { loginAxios, tokenVerifyAxios };
