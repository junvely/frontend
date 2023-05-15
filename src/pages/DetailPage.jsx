import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import postimg from "../img/post.png";
import profileimg from "../img/profile.png";
import Comments from "../components/Comments";
import { commentSubmit, detailRequest } from "../apis/api";
import { useParams } from "react-router";

function DetailPage() {
  const authorization = sessionStorage.getItem("accessToken");
  const [comment, setComment] = useState("");
  /*   const [item, setItem] = useState([]); */
  const queryClient = useQueryClient;

  const commentSubmitMutation = useMutation(commentSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("deatail", detailRequest);
    },
  });

  const commentSubmitButtonHandler = (e) => {
    e.preventDefault();
    commentSubmitMutation.mutate({ comment, authorization });
    setComment("");
  };
  // 현재 페이지 URL에서 postId 추출
  const params = useParams();
  const postId = params.id;

  const { isLoading, isError, data } = useQuery("detail", () =>
    detailRequest({ postId, authorization })
  );
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  return (
    <div>
      <Container>
        <PostImage />
        <ContentWrapper>
          <UserInfo>
            <UserImage image={data.userPhoto} />
            <span>{data.nickname}</span>
            {data.follow ? (
              <></>
            ) : (
              <FollowBtn
                onClick={() => {
                  data.follw = true;
                }}
              >
                팔로우
              </FollowBtn>
            )}
          </UserInfo>
          <PostContent image={data.postPhoto}>
            <UserInfo>
              <UserImage image={data.userPhoto} />
              <span>{data.nickname}</span>
            </UserInfo>
            <p>{data.content}</p>
          </PostContent>
          <Comments postId={postId} />
          {/* <CommentList>
            <li>
              <img src="프로필 사진 주소" alt="프로필 사진" />
              <span>닉네임</span>
              <span>댓글 내용</span>
            </li>
            ...
          </CommentList> */}
          <Wrap>
            <LikeInfo>
              <span>좋아요 {data.likesCount}개</span>
            </LikeInfo>
            <CommentAdd onSubmit={commentSubmitButtonHandler}>
              <CommentInput
                placeholder="댓글 달기..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <CommentAddBtn>게시</CommentAddBtn>
            </CommentAdd>
          </Wrap>
        </ContentWrapper>
      </Container>
    </div>
  );
}

export default DetailPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin: 0px 330px;
  height: 95vh;
`;

// PostImage 컴포넌트
const PostImage = styled.div`
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  width: 60%;
  height: 70vh;
`;
const ContentWrapper = styled.div`
  width: 40%;
  margin-top: 0;
  /*  display: flex; 
  flex-direction: column;
  align-items: flex-end;*/
`;
// UserInfo 컴포넌트
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;

  span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    display: inline-block; /* span 요소가 블록 레벨 요소로 동작하게 만듭니다. */
    width: 200px; /* 고정된 가로 길이를 지정합니다. */
    /*  overflow: hidden; 가로 길이를 넘어가는 내용을 자르고 숨깁니다. */
    white-space: nowrap; /* 공백 문자를 처리하지 않고 모든 문자를 한 줄로 표시합니다. */
  }
`;
const UserImage = styled.div`
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 1rem;
`;

// PostContent 컴포넌트
const PostContent = styled.div`
  margin-bottom: 1rem;

  p {
    font-size: 1.2rem;
    color: #494949;
  }
`;

// CommentList 컴포넌트
const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;

  li {
    margin-bottom: 0.5rem;
  }

  span {
    margin-right: 0.5rem;
    font-weight: bold;
    color: #333;
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
`;

// CommentInput 컴포넌트
const CommentInput = styled.input`
  width: 90%;
  padding: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
  }
`;
const CommentAddBtn = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  color: #359fe5;
  &:hover {
    color: #333;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 400px;
`;

const FollowBtn = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  color: #359fe5;
  &:hover {
    color: #333;
  }
`;
