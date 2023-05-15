import { instance } from "../axios";

const signupAxios = async (payload) => {
  const formdata = new FormData();
  formdata.append("userPhoto", payload.userPhoto);
  console.log(payload);

  // 폼 객체 key 값을 순회.
  let keys = formdata.keys();
  for (const pair of keys) {
    console.log(pair);
  }

  // 폼 객체 values 값을 순회.
  let values = formdata.values();
  for (const pair of values) {
    console.log(pair);
  }

  // 폼 객체 key 와 value 값을 순회.
  let entries = formdata.entries();
  for (const pair of entries) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const config = {
    Headers: {
      "content-type": "multipart/form-data",
    },
  };

  try {
    await instance.post("/api/signup", payload, { formdata, ...config });
    alert("회원가입 성공");
    // 회원가입 성공시 자동으로 로그인 되게 하는 로직 추가
  } catch (error) {
    alert(error.errorMessage);
    throw error;
  }
};

export { signupAxios };
