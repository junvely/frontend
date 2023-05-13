import { Link } from "react-router-dom";
import { StButton, StLinkCon } from "../styles/Components";
import Input from "./Input";

function Login() {
  return (
    <>
      <Input type="test" placeHolder={"사용자 이메일"}></Input>
      <Input type="password" placeHolder={"비밀번호"}></Input>
      <StButton>로그인</StButton>
      <StLinkCon>
        계정이 없으신가요? <Link to="/signup">가입하기</Link>
      </StLinkCon>
    </>
  );
}

export default Login;
