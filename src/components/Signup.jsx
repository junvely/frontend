import React from "react";
import Input from "./Input";
import {
  StButton,
  StImageUpload,
  StLabel,
  StLinkCon,
} from "../styles/Components";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <h4>친구들의 사진과 동영상을 보려면 가입하세요.</h4>
      <StImageUpload>
        <StLabel>프로필 사진을 선택해 주세요.</StLabel>
        <input type="file"></input>
      </StImageUpload>
      <Input type="text" value="" placeHolder="이메일 주소" onClick="" />
      <Input type="text" value="" placeHolder="성명" onClick="" />
      <Input type="text" value="" placeHolder="사용자 이름" onClick="" />
      <Input type="text" value="" placeHolder="비밀번호" onClick="" />
      <p>
        저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
        업로드했을 수도 있습니다.
        <Link to="https://www.facebook.com/help/instagram/261704639352628">
          더 알아보기
        </Link>
      </p>
      <StButton>가입</StButton>
      <StLinkCon>
        계정이 있으신가요? <Link to="/">로그인</Link>
      </StLinkCon>
    </>
  );
}

export default Signup;
