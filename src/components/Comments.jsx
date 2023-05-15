import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { commentRequest, commentDelete } from "../apis/api";
import commentprofile from "../img/comment.png";
import { QueryClient, useMutation } from "react-query";

function Comments(postId) {
  const authorization = sessionStorage.getItem("accessToken");
  /*   const [comments, setComments] = useState([]); */

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
    <CommentList>
      {data?.map((item) => {
        return (
          <li>
            <UserInfo>
              <UserImage photo={item.userPhoto} />
              <span>{item.nickname}</span>
              {/*  <button
                onClick={() => {
                  commentDeleteBtnHandler(item.commentId);
                }}
              >
                x
              </button> */}
            </UserInfo>
            <p>{item.comment}</p>
          </li>
        );
      })}
    </CommentList>
  );
}

export default Comments;

// CommentList 컴포넌트
const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
  li {
    display: flex;
  }

  span {
    margin-right: 0.5rem;
  }
`;

// UserInfo 컴포넌트
const UserInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    display: inline-block; /* span 요소가 블록 레벨 요소로 동작하게 만듭니다. */
    width: 200px;
    /*  overflow: hidden; 가로 길이를 넘어가는 내용을 자르고 숨깁니다. */
    white-space: nowrap; /* 공백 문자를 처리하지 않고 모든 문자를 한 줄로 표시 */
  }

  button {
    margin-left: auto; // 오른쪽으로 정렬
    border: none;
    background-color: transparent;
  }
`;
const UserImage = styled.div`
  background-image: url(${commentprofile});
  background-size: cover;
  background-position: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 1rem;
`;
{
  /*  <UserInfo>
          <UserImage />
          <span>닉네임</span>
          <button onClick={commentDeleteBtnHandler}>x</button>
        </UserInfo>
        <p>
          댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용
          댓글 내용
        </p>
      </li> */
}
