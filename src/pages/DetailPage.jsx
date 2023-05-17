import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import Comments from "../components/Comments";
import { commentRequest, commentSubmit, detailRequest } from "../apis/api";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import Sidebar from "../components/Sidebar";
import { StSideCon } from "../styles/Pages";

function DetailPage() {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient;
  // 현재 페이지 URL에서 postId 추출
  const params = useParams();
  const postId = params.id;
  const commentSubmitMutation = useMutation(commentSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      setComment("");
    },
  });
  const { isLoading, isError, data } = useQuery("detail", () =>
    detailRequest(postId)
  );
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  const commentSubmitButtonHandler = (e) => {
    commentSubmitMutation.mutate({ postId, comment });
    console.log("댓글!!!", comment);
  };

  return (
    <StWrap>
      <StSideCon>
        <Sidebar />
      </StSideCon>
      <Container>
        <PostImageWrapper>
          <PostImage src={data.postPhoto} />
        </PostImageWrapper>
        <ContentWrapper>
          <UserInfo style={{ borderBottom: "1px solid lightgray" }}>
            <UserImage src={data.userPhoto} />
            <span>{data.nickname}</span>
            {data.follow ? (
              <>
                <FollowBtn
                  onClick={() => {
                    data.follow = true;
                  }}
                >
                  팔로잉
                </FollowBtn>
              </>
            ) : (
              <FollowBtn
                onClick={() => {
                  data.follow = true;
                }}
              >
                팔로우
              </FollowBtn>
            )}
          </UserInfo>
          <PostContent>
            <UserInfo>
              <UserImage src={data.userPhoto} />
              <span>{data.nickname}</span>
            </UserInfo>
            <p>{data.content}</p>
          </PostContent>
          <Comments postId={postId} />

          <Wrap>
            <LikeInfo>
              <span>좋아요 {data.likesCount}개</span>
            </LikeInfo>
            <CommentAdd>
              <CommentInput
                placeholder="댓글 달기..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <CommentAddBtn type="submit" onClick={commentSubmitButtonHandler}>
                게시
              </CommentAddBtn>
            </CommentAdd>
          </Wrap>
        </ContentWrapper>
      </Container>
    </StWrap>
  );
}

export default DetailPage;

const StWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: calc(100vh - 2rem);
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 1200px;
  overflow-y: auto;
`;
const PostImageWrapper = styled.div`
  width: 70%;
  height: 100%;
  overflow: hidden;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.5rem;

  span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
  }
`;

const PostContent = styled.div`
  margin-bottom: 1rem;

  p {
    font-size: 1.2rem;
    color: #494949;
    margin-left: 1rem;
  }
`;

// LikeInfo 컴포넌트
const LikeInfo = styled.div`
  margin-bottom: 1rem;

  span {
    font-size: 1.5rem;
    color: #333;
    font-weight: bold;
  }
`;

const CommentAdd = styled.form`
  display: flex;
  border-top: 1px solid #ccc;
  padding-top: 0.7rem;
  align-items: center;
  justify-content: center;
`;

// CommentInput 컴포넌트
const CommentInput = styled.input`
  width: 90%;
  padding: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border: none;

  &:focus {
    outline: none;
  }
`;
const CommentAddBtn = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  color: #359fe5;
  border: none;
  width: 70px;
  margin-bottom: 1rem;
  background-color: white;
  &:hover {
    color: #333;
  }
`;

const ContentWrapper = styled.div`
  width: 40%;
  margin-top: 0;
  max-height: 100%;
  overflow-y: auto;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 518px;
  justify-content: flex-end;
`;

const FollowBtn = styled.button`
  font-size: 1.3rem;
  margin-left: 20px;
  font-weight: bold;
  color: #359fe5;
  border: none;
  background-color: white;
  &:hover {
    color: #333;
  }
`;
