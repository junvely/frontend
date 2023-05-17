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
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

const sendEmailAxios = async (email) => {
  console.log("email:", email);
  try {
    const { data } = await instance.post("/api/mail", { mail: email });
    return data.authNum;
  } catch (error) {
    const errorMessage = error.response.data.errorMessage;
    alert(errorMessage);
    throw error;
  }
};

export { signupAxios, sendEmailAxios };
