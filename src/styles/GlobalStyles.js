import { createGlobalStyle, styled } from "styled-components";

//colors
export const Colors = {
  buttonBlue: "#4cb4f8",
  borderGrey: "#fafafa",
  shadow: "0 2px 3px rgba(0, 0, 0, 0.19)",
};

//wrap
export const Stwrap = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

export const StFlexAll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StFlexCon = styled.div`
  display: flex;
  justify-content: center;
`;

export const GlobalStyles = createGlobalStyle`
    *{
        margin : 0;
        padding : 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }

    a{
        text-decoration: none;
    }

    button{
        cursor: pointer;
    }
`;
