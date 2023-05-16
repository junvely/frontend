import { instance } from "../axios";

const signupAxios = async (payload) => {
  const formData = new FormData();
  formData.append("userPhoto", payload.userPhoto);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  try {
    await instance.post("/api/signup", { ...payload, formData }, config);
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    // alert(error.errorMessage);
    throw error;
  }
};

export { signupAxios };
