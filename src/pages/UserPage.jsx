import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { userFollow, userRequest } from "../apis/user";
import styled from "styled-components";
import postimg from "../img/post.png";
import { postUser } from "../apis/post";

function UserPage() {
  const followMutation = useMutation(userFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries("user", userRequest);
      /* queryClient.refetchQueries(); */
    },
  });
  const { isLoading, isError, data } = useQuery("user", postUser);
  // 현재 페이지 URL에서 userId 추출
  const params = useParams();
  const userId = params.id;
  const queryClient = useQueryClient();
  /*   const { isLoading, isError, data } = useQuery("user", () =>
    userRequest(userId)
  ); */
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }
  const posts = [
    { postPhoto: { postimg } },
    { postPhoto: { postimg } },
    { postPhoto: { postimg } },
  ];

  const follow = () => {
    followMutation.mutate(userId);
  };
  const showFollower = () => {};
  const showFollow = () => {};
  return (
    <>
      <ProfileSection>
        <ProfilePicture src={data.userPhoto} />
        <ProfileInfo>
          <UserNickname>{data.nickname}</UserNickname>
          {/*           {data.follow ? (
            <button>팔로잉</button>
          ) : (
            <button onClick={follow}>팔로우</button>
          )}
          <Post>게시물 {data}</Post> */}
          <FollowerListSection onClick={showFollower}>
            팔로워{}
          </FollowerListSection>
          <FollowerListSection onClick={showFollow}>
            팔로우{}
          </FollowerListSection>
        </ProfileInfo>
      </ProfileSection>

      <PostListSection>
        {posts?.map((item) => {
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
const UserNickname = styled.h2`
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

const PostListItem = styled.div`
  width: calc(33.33% - 10px);
  margin: 5px;
`;
const PostImage = styled.img`
  width: 100%;
  height: auto;
`;
