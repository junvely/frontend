import React from "react";
import { ProfileCon, StProfileImage, StUserName } from "../styles/Components";
import { useNavigate } from "react-router";

function UserRecommand({ user, myProfile }) {
  const navigate = useNavigate();
  const { name, userPhoto, nickname, UserId } = user;

  const logout = (e) => {
    e.stopPropagation();
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userId");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <ProfileCon
      myprofile={myProfile && "true"}
      onClick={() => navigate(`/users/${UserId}`)}
    >
      <StProfileImage width={myProfile ? "66px" : "44px"}>
        <img src={userPhoto} alt="story-image"></img>
      </StProfileImage>
      <StUserName myprofile={myProfile && "true"}>
        <span> {nickname}</span>
        <p> {myProfile ? name : "회원님을 위한 추천"}</p>
      </StUserName>
      {myProfile ? <span onClick={logout}>전환</span> : <span>팔로우</span>}
    </ProfileCon>
  );
}

export default UserRecommand;
