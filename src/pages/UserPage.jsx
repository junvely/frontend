import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { userFollow, userRequest } from "../apis/user";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { StSideCon } from "../styles/Pages";

function UserPage() {
  // 현재 페이지 URL에서 userId 추출
  const params = useParams();
  const userId = params.id;
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery("user", () =>
    userRequest(userId)
  );
  const followMutation = useMutation(userFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries("user", userRequest);
      /* queryClient.refetchQueries(); */
    },
  });
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  const userFollow = () => {
    followMutation.mutate(userId);
  };
  const showFollower = () => {};
  const showFollow = () => {};
  return (
    <>
      <StSideCon>
        <Sidebar />
      </StSideCon>
      <ProfileSection>
        <ProfilePicture src={data.userPhoto} />
        <ProfileInfo>
          <UserNickname>{data.nickname}</UserNickname>
          {data.follow ? (
            <FollowBtn>팔로잉</FollowBtn>
          ) : (
            <FollowBtn onClick={userFollow}>팔로우</FollowBtn>
          )}
          <Post>게시물 {data.postCount}</Post>
          <FollowerListSection onClick={showFollower}>
            팔로워{data.follwCount}
          </FollowerListSection>
          <FollowerListSection onClick={showFollow}>
            팔로우{data.followeeCount}
          </FollowerListSection>
        </ProfileInfo>
      </ProfileSection>

      <PostListSection>
        {data.data?.map((item) => {
          return (
            <PostListItem>
              <PostImage src={item.postPhoto} />
            </PostListItem>
          );
        })}
      </PostListSection>
    </>
  );
}

export default UserPage;
// 프로필 섹션
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin: 1rem;
`;

const ProfileInfo = styled.div`
  margin-left: 16px;
`;
const UserNickname = styled.h5`
  /* 유저 닉네임 스타일링 */
`;

const Post = styled.div`
  /* 게시물 스타일링 */
`;
// 팔로워/팔로잉 목록 섹션
const FollowerListSection = styled.div``;

// 글 목록 섹션
const PostListSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const FollowBtn = styled.button`
  border: none;
  background-color: #d3d3d3;
  font-weight: bold;
  font-size: 11px;
`;
const PostListItem = styled.div`
  width: calc(33.33% - 10px);
  margin: 5px;
`;
const PostImage = styled.img`
  width: 100%;
  height: auto;
`;
