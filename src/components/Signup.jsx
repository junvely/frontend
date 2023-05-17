import React, { useEffect, useMemo, useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm.js";
import { Colors } from "../styles/GlobalStyles";
import { signupAxios } from "../apis/auth/signup";
import { useMutation } from "react-query";
import {
  StButton,
  StEmailChecking,
  StImageUpload,
  StLabel,
  StLinkCon,
  StProfile,
} from "../styles/Components";
import { useFileReader } from "../hooks/useFileLeader";

function Signup() {
  const navigate = useNavigate();
  const mutation = useMutation(signupAxios, {
    onSuccess: () => {
      alert("회원가입 성공");
      resetForm();
      navigate("/");
    },
  });

  const [loginActive, setLoginActive] = useState(false);

  const initialState = {
    email: "",
    password: "",
    name: "",
    nickname: "",
    userPhoto: "",
  };

  const [form, handleFormChange, handleFileChange, resetForm] =
    useForm(initialState);
  const { email, password, name, nickname } = form;
  const [imageUrl, fileReader] = useFileReader();

  // 정규식
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  // 이메일 에러 메세지
  /*  const emailMessage = useMemo(() => {
    if (email && !emailRegex.test(email)) {
      return "이메일을 확인해 주세요";
    } else {
      return "";
    }
  }, [email]); */

  // 패스워드 에러메세지
  const passwordMessage = useMemo(() => {
    if (password && !passwordRegex.test(password)) {
      return "비밀번호는 영문, 숫자 포함 8자리 이상입니다.";
    } else {
      return "";
    }
  }, [password]);

  //회원가입 버튼 active
  const signupActiveChange = (e) => {
    if (
      !form.email ||
      !form.password ||
      !form.name ||
      !form.nickname ||
      /*   emailMessage || */
      passwordMessage
    ) {
      setLoginActive(false);
    } else {
      setLoginActive(true);
    }
  };

  // 회원가입 api
  const handleClickLogin = (e) => {
    if (loginActive) {
      mutation.mutate(form);
    } else {
      return;
    }
  };

  // 이미지 파일 리더
  const imageFileReader = async () => {
    if (form.userPhoto) {
      fileReader(form.userPhoto);
    }
  };

  useEffect(() => {
    signupActiveChange();
  }, [name, nickname, email, password]);

  useEffect(() => {
    imageFileReader();
  }, [form.userPhoto]);

  return (
    <>
      <h4>친구들의 사진과 동영상을 보려면 가입하세요.</h4>
      <StImageUpload>
        <StLabel>프로필 사진을 선택해 주세요.</StLabel>
        <StProfile image={imageUrl}>IMAGE</StProfile>
        <input
          type="file"
          id="fileUpload"
          name="userPhoto"
          multiple={true}
          onChange={handleFileChange}
        ></input>
      </StImageUpload>
      <StEmailChecking>
        <Input
          type="text"
          name="email"
          value={email}
          placeHolder="이메일 주소"
          onChange={handleFormChange}
          /*  message={emailMessage} */
        />
        <StButton width="30%">확인</StButton>
      </StEmailChecking>
      <Input
        type="text"
        name="name"
        value={name}
        placeHolder="성명"
        onChange={handleFormChange}
      />
      <Input
        type="text"
        name="nickname"
        value={nickname}
        placeHolder="사용자 이름"
        onChange={handleFormChange}
      />
      <Input
        type="text"
        name="password"
        value={password}
        placeHolder="비밀번호"
        onChange={handleFormChange}
        message={passwordMessage}
      />
      <p>
        저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
        업로드했을 수도 있습니다.
        <Link to="https://www.facebook.com/help/instagram/261704639352628">
          더 알아보기
        </Link>
      </p>
      <StButton
        onClick={handleClickLogin}
        bgcolor={loginActive ? Colors.buttonActiveBlue : Colors.buttonBlue}
      >
        가입
      </StButton>
      <StLinkCon>
        계정이 있으신가요? <Link to="/">로그인</Link>
      </StLinkCon>
    </>
  );
}

export default Signup;
