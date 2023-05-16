import axios from "axios";
import { tokenVerifyAxios } from "./auth/login";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const verifyInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const accessToken = sessionStorage.getItem("accessToken");
  config.headers["accessToken"] = accessToken;
  return config;
});

// 토큰 verify instance
verifyInstance.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const refreshToken = sessionStorage.getItem("refreshToken");
  const userId = sessionStorage.getItem("userId");
  config.headers["refreshToken"] = refreshToken;
  config.headers["userId"] = userId;
  return config;
});

instance.interceptors.response.use(
  function (response) {
    const accessToken = response.headers["accessToken"];
    const refreshToken = response.headers["refreshToken"];
    const userId = response.headers["userId"];

    if (accessToken && refreshToken) {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("userId", userId);
    } else if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    }
    return response;
  },

  function (error) {
    // 액세스 토큰 만료시 리프레쉬 토큰 전달
    if (error.errorMessage === "액세스 토큰이 만료되었습니다") {
      tokenVerifyAxios();
      // 리프레쉬 토큰 만료시 토큰 삭제 및 로그아웃 처리
    } else if (error.errorMessage === "리프레쉬 토큰이 만료되었습니다") {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("userId");
      alert("유효기간이 만료되어 로그인 페이지로 이동합니다.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { instance, verifyInstance };
