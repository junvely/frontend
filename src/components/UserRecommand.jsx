import React from "react";
import { ProfileCon, StProfileImage, StUserName } from "../styles/Components";

function UserRecommand({ user, myProfile }) {
  const { name, userPhoto, nickname } = user;

  return (
    <ProfileCon myProfile={myProfile}>
      <StProfileImage width={myProfile ? "66px" : "44px"}>
        <img src={userPhoto} alt="story-image"></img>
      </StProfileImage>
      <StUserName myProfile={myProfile}>
        <span> {nickname}</span>
        <p> {myProfile ? name : "회원님을 위한 추천"}</p>
      </StUserName>
      <span>팔로우</span>
    </ProfileCon>
  );
}

export default UserRecommand;
