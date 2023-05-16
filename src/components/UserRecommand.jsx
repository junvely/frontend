import React from "react";
import { ProfileCon, StProfileImage, StUserName } from "../styles/Components";
import { useNavigate } from "react-router";

function UserRecommand({ user, myProfile }) {
  const navigate = useNavigate();
  const { name, userPhoto, nickname, UserId } = user;

  return (
    <ProfileCon
      myProfile={myProfile}
      onClick={() => navigate(`/user/${UserId}`)}
    >
      <StProfileImage width={myProfile ? "66px" : "44px"}>
        <img src={userPhoto} alt="story-image"></img>
      </StProfileImage>
      <StUserName myProfile={myProfile}>
        <span> {nickname}</span>
        <p> {myProfile ? name : "회원님을 위한 추천"}</p>
      </StUserName>
      <span>{myProfile ? "전환" : "팔로우"}</span>
    </ProfileCon>
  );
}

export default UserRecommand;
