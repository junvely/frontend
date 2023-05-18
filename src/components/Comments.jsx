import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { commentRequest, commentDelete } from "../apis/api";
import { QueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router";

function Comments({ postId }) {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery("comments", () =>
    commentRequest(postId)
  );

  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  /*   const commentDeleteMutation = useMutation(commentDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail", detailRequest);
    },
    onError: () => {
      alert("작성자만 삭제할 수 있습니다!");
    },
  }); */
  /*  const mutationGetComment = useMutation(commentRequest, {
    onSuccess: (response) => {
      setComments(response);
    },
    onError: (Error) => {
      alert(error);
    },
  });
  useEffect(() => {
    mutationGetComment.mutate(postId);
  }, []); */
  /*  const mutationCommentDelete = useMutation(commentDelete, {
    onSuccess: () => {
      QueryClient.invalidateQueries("comments", commentRequest);
    },
  });
  const commentDeleteBtnHandler = (commentId) => {
       console.log(e.target.dataset);
    const commentId = e.target.dataset.id;
    mutationCommentDelete.mutate({ postId, commentId, authorization });
  }; */

  return (
    <CommentsContainer>
      <CommentsList>
        {data.commentsData?.map((item) => (
          <li key={item.commentId}>
            <CommentItem key={item.commentId}>
              <UserImage
                onClick={() => {
                  navigate(`/users/${item.UserId}`);
                }}
                src={item.userPhoto}
              />
              <UserInfo>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/users/${item.UserId}`);
                  }}
                >
                  {item.nickname}
                </span>
                <p>{item.comment}</p>
              </UserInfo>
            </CommentItem>
          </li>
        ))}
      </CommentsList>
    </CommentsContainer>
  );
}
{
}
export default Comments;

const CommentList = styled.ul`
  list-style: none;
  padding-left: 1rem;
  font-size: 1.2rem;
  color: #333;
  overflow-y: auto;
`;
const CommentItem = styled.li`
  display: flex;
  align-items: center;
  height: auto;
  min-height: 60px;
  /*   height: 60px; */
`;

const UserImage = styled.img`
  background-size: cover;
  background-position: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 0.5rem;
  cursor: pointer;
  overflow: auto;
  /*   &:hover {
    transform: scale(1.1);
  } */
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    margin-right: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #333;
    margin: 0;
  }
`;
const CommentsContainer = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
/* const CommentsContainer = styled.div`
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
`; */

const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
