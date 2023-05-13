import React from "react";
import { StInput } from "../styles/Components";

function Input({ type, children, name, value, placeHolder, onClick }) {
  return (
    <>
      <StInput
        type={type}
        value={value}
        placeholder={placeHolder}
        onClick={onClick}
      ></StInput>
    </>
  );
}

export default Input;
