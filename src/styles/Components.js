import { styled } from "styled-components";
import { Colors } from "./GlobalStyles";

export const StLabel = styled.label`
  font-size: 0.9rem;
  padding: 1% 0;
`;

export const StInput = styled.input`
  width: 100%;
  line-height: 2rem;
  font-size: 0.8rem;
  padding: 1% 3%;
  margin: 1.2% 0;
  background-color: ${Colors.borderGrey};
  border: 1px solid rgb(219, 219, 219);
  border-radius: 3px;
  &:focus {
    outline: 2px solid ${Colors.buttonBlue};
  }
`;

export const StButton = styled.button`
  width: 100%;
  line-height: 2rem;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-top: 10px;
  background-color: ${Colors.buttonBlue};
  border: none;
  border-radius: 7px;
  box-shadow: ${Colors.shadow};
`;

export const StLinkCon = styled.div`
  width: 100%;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 15%;

  a {
    color: ${Colors.buttonBlue};
    font-weight: bold;
  }
`;

// Signup
export const StImageUpload = styled.div`
  padding: 5%;
  margin-bottom: 3%;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: ${Colors.shadow};

  input {
    padding-top: 3%;
  }
`;

// Login
