import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import Comments from "../components/Comments";
import { commentSubmit, detailRequest } from "../apis/api";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "react-query";
import Sidebar from "../components/Sidebar";
import { StSideCon } from "../styles/Pages";
import { userFollow, userRequest } from "../apis/user";
import { StButtons, StLeftCon } from "../styles/Components";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { GrBookmark } from "react-icons/gr";
import { HiOutlineHeart } from "react-icons/hi";
import { isLikeAxios } from "../apis/feed";

function DetailPage() {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  const mutation = useMutation(isLikeAxios, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail");
    },
  });
  const handleClickLikeButton = () => {
    mutation.mutate(postId);
  };

  const followMutation = useMutation(userFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail");
      queryClient.invalidateQueries("user");
    },
  });
  const follow = () => {
    followMutation.mutate(data.UserId);
  };

  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  const commentSubmitButtonHandler = (e) => {
    commentSubmitMutation.mutate({ postId, comment });
  };

  return (
    <StWrap>
      <StSideCon>
        <Sidebar />
      </StSideCon>
      <ContainerWrap>
        <Container>
          <PostImageWrapper>
            <PostImage
              style={{
                backgroundImage: `url(${data.postPhoto})`,
              }}
            />
          </PostImageWrapper>
          <ContentWrapper>
            <UserInfo style={{ borderBottom: "1px solid lightgray" }}>
              <UserImage
                onClick={() => {
                  navigate(`/users/${data.UserId}`);
                }}
                src={data.userPhoto}
              />
              <span
                onClick={() => {
                  navigate(`/users/${data.UserId}`);
                }}
                style={{ cursor: "pointer" }}
              >
                {data.nickname}
              </span>
              <FollowBtn onClick={follow}>
                {data.mine ? <></> : data.follow ? "팔로잉" : "팔로우"}
              </FollowBtn>
            </UserInfo>
            <PostContent>
              <UserInfo
                onClick={() => {
                  navigate(`/users/${data.UserId}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <UserImage src={data.userPhoto} />
                <span>{data.nickname}</span>
              </UserInfo>
              <p>{data.content}</p>
            </PostContent>
            <Comments postId={postId} />
            <Wrap>
              <StButtons>
                <StLeftCon>
                  {data?.isLiked ? (
                    <button>
                      <MdFavorite
                        onClick={handleClickLikeButton}
                        style={{ color: "#ff3040", fontSize: "30px" }}
                      />
                    </button>
                  ) : (
                    <button>
                      <HiOutlineHeart
                        onClick={handleClickLikeButton}
                        style={{ fontSize: "30px" }}
                      />
                    </button>
                  )}
                  <button>
                    <FaRegComment
                      style={{
                        transform: "scaleX(-1)",
                      }}
                    />
                  </button>
                  <button>
                    <IoPaperPlaneOutline />
                  </button>
                </StLeftCon>
                <button style={{ padding: "8px 0" }}>
                  <GrBookmark />
                </button>
              </StButtons>
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
                <CommentAddBtn
                  type="submit"
                  onClick={commentSubmitButtonHandler}
                >
                  게시
                </CommentAddBtn>
              </CommentAdd>
            </Wrap>
          </ContentWrapper>
        </Container>
      </ContainerWrap>
    </StWrap>
  );
}

export default DetailPage;

const StWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PostImageWrapper = styled.div`
  width: 66.66%;
  height: 100%;
  overflow: hidden;
`;
const PostImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 1rem;
  cursor: pointer;
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
    margin-left: 10px;
    font-size: 1.1rem;
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
  font-size: 1.1em;
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
const ContainerWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  width: 1000px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 50px auto;
  margin-right: 200px;
  margin-left: 200px;
  padding: 20px;
  max-width: 1200px;
  overflow-y: auto;
  position: relative;
`;

const ContentWrapper = styled.div`
  flex-basis: 33.33%;

  min-height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const Wrap = styled.div`
  position: fixed;
  padding-bottom: 5.5rem;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: auto;
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
