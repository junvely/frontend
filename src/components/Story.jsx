import React from "react";
import { StStory } from "../styles/Components";
import { useNavigate } from "react-router";

function Story({ width, imageUrl, userId }) {
  const navigate = useNavigate();

  return (
    <StStory width={width} onClick={() => navigate(`/user/${userId}`)}>
      <img src={imageUrl} alt="story-image"></img>
    </StStory>
  );
}

export default Story;
