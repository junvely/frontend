import { styled } from "styled-components";
import { StFlexAll, StFlexCon } from "./GlobalStyles";

// AccountPage
export const StAccountCon = styled(StFlexAll)`
  width: 100%;
  height: 100vh;
  padding: 5% 0;
`;

export const StFormCon = styled.div`
  width: 350px;
  height: auto;
  padding: 2.3rem;
  border: 1px solid #ccc;
  border-radius: 10px;

  h2 {
    width: 100%;
    height: 54px;
    margin-bottom: 10%;
    position: relative;
    overflow: hidden;
    display: flex;

    img {
      width: 175px;
      height: auto;
      display: block;
      position: absolute;
      top: -48px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  h4 {
    font-size: 17px;
    text-align: center;
    padding-bottom: 10%;
    color: #666;
  }

  p {
    font-size: 0.75rem;
    color: #666;
    padding: 5% 0;

    a {
      color: navy;
    }
  }
`;

// MainPage
export const StSideCon = styled.div`
  width: 100%;
  max-width: 335px;
  height: 100vh;
  border: 1px solid;
  position: sticky;
  left: 0;
  top: 0;
`;

export const StMainCon = styled(StFlexCon)`
  width: 100%;
`;

export const StInnerCon = styled.div`
  width: 100%;
  max-width: 1020px;
  height: auto;
  margin: 0 auto;
`;

export const StFeedCon = styled.div`
  width: 100%;
  max-width: 630px;
`;

export const StRecommandCon = styled.div`
  width: 100%;
  max-width: 320px;
  height: 100vh;
  border: 1px solid;
`;

export const StStoryList = styled(StFlexCon)`
  margin: 1rem 0;
  padding: 1rem 0;
`;

export const StStoryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    font-size: 0.7rem;
    text-align: center;
    margin-top: 3px;
  }
`;

export const StFeedList = styled.div`
  width: 100%;
  max-width: 470px;
  margin: 0 auto;
`;
