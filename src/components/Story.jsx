import React from "react";
import { StStory } from "../styles/Components";

function Story({ width, imageUrl }) {
  return (
    <StStory width={width} onClick={() => alert("준비 중 입니다.")}>
      <img src={imageUrl} alt="story-image"></img>
    </StStory>
  );
}

export default Story;
