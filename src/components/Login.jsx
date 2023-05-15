import { Link, useNavigate } from "react-router-dom";
import { StButton, StLinkCon } from "../styles/Components";
import Input from "./Input";
import { useForm } from "./hooks/useForm";
import { useMutation } from "react-query";
import { signupAxios } from "../apis/auth/signup";

function Login() {
  const navigate = useNavigate();
  const mutation = useMutation(signupAxios, {
    onSuccess: () => {
      resetForm();
      navigate("/main");
    },
  });

  const initialState = {
    email: "",
    password: "",
  };
  const [form, handleFormChange, resetForm] = useForm(initialState);
  const { email, password } = form;

  const handleClickLogin = () => {
    if (!email || !password) {
      alert("아이디와 패스워드를 모두 입력해주세요.");
      return;
    }
    mutation(form);
  };

  return (
    <>
      <Input
        type="text"
        name="email"
        value={email}
        placeHolder="사용자 이메일"
        onChange={handleFormChange}
      />
      <Input
        type="text"
        name="password"
        value={password}
        placeHolder="비밀번호"
        onChange={handleFormChange}
      />
      <StButton onClick={handleClickLogin}>로그인</StButton>
      <StLinkCon>
        계정이 없으신가요? <Link to="/signup">가입하기</Link>
      </StLinkCon>
    </>
  );
}

export default Login;
