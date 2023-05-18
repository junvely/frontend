import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import { userFollow, userRequest } from "../apis/user";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { StSideCon } from "../styles/Pages";
import FollowModal from "../components/FollowModal";
import FollowerModal from "../components/FollowerModal";

function UserPage() {
  // 현재 페이지 URL에서 userId 추출
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery("userInfo", () =>
    userRequest(userId)
  );
  console.log("userpage", data);
  const followMutation = useMutation(userFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("userInfo", userRequest);
    },
  });
  const [followStatus, setFollowStatus] = useState(data?.follow);
  const follow = () => {
    followMutation.mutate(userId);
    setFollowStatus(!followStatus);
  };

  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);

  const showFollower = () => {
    setShowFollowerModal(!showFollowerModal);
  };

  const showFollow = () => {
    setShowFollowModal(!showFollowModal);
  };
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  return (
    <UserPageContainer>
      <StSideCon>
        <Sidebar />
      </StSideCon>
      <ProfileAndPostContainer>
        <ProfileSection>
          <ProfilePicture src={data.userPhoto} />
          <ProfileInfo>
            <Stwrap>
              <UserNickname>{data.nickname}</UserNickname>
              <FollowBtn onClick={follow}>
                {data.mine ? "프로필 편집" : followStatus ? "팔로잉" : "팔로우"}
              </FollowBtn>
            </Stwrap>
            <Stwrap>
              <Post>게시물 {data.postsCount}</Post>
              <FollowerListSection onClick={showFollower}>
                팔로워 {data.followCount}
              </FollowerListSection>
              <FollowerListSection onClick={showFollow}>
                팔로우 {data.followerCount}
              </FollowerListSection>
            </Stwrap>
          </ProfileInfo>
        </ProfileSection>
        {showFollowerModal && (
          <FollowerModal showFollower={showFollower} userId={userId} />
        )}

        {showFollowModal && (
          <FollowModal showFollow={showFollow} userId={userId} />
        )}

        <PostListSection>
          {data.data?.map((item) => {
            return (
              <PostListItem
                onClick={() => {
                  navigate(`/main/${item.postId}`);
                }}
              >
                <PostImage src={item.postPhoto} />
              </PostListItem>
            );
          })}
        </PostListSection>
      </ProfileAndPostContainer>
    </UserPageContainer>
  );
}

export default UserPage;
const UserPageContainer = styled.div`
  display: flex;
`;

const ProfileAndPostContainer = styled.div`
  margin: 0 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 20px;
`;
const Stwrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 25px;
`;
const ProfilePicture = styled.img`
  width: 160px;
  height: 160px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin: 1rem;
  border: 1px solid #d8d8d8;
`;

const ProfileInfo = styled.div`
  margin-left: 16px;
  margin-top: 30px;
`;
const UserNickname = styled.h2`
  font-size: 26px;
`;

const Post = styled.div`
  font-weight: bold;
`;

const FollowerListSection = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

const PostListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #eee;
`;
const FollowBtn = styled.button`
  border: none;
  background-color: #e9e6e6;
  border-radius: 5px;
  margin-left: 30px;
  font-weight: bold;
  width: 100px;
  padding: 10px;
  font-size: 14px;
`;
const PostListItem = styled.div`
  width: calc(33.33% - 10px);
  height: 379px;
  margin: 5px;
  min-width: 379px;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
`;
