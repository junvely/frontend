import React from "react";
import { Stwrap } from "../styles/GlobalStyles";
import Story from "./Story";
import { TfiMoreAlt } from "react-icons/tfi";
import {
  StButtons,
  StContent,
  StFeedTitle,
  StLeftCon,
  StPhoto,
  StUserInfo,
} from "../styles/Components";
import { MdFavorite } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { GrBookmark } from "react-icons/gr";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { isLikeAxios } from "../apis/feed";
import { Link } from "react-router-dom";

function Feed({ post }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(isLikeAxios, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const {
    postId,
    UserId,
    content,
    postPhoto,
    likesCount,
    nickname,
    name,
    userPhoto,
    commentsCount,
    isliked,
  } = post;

  const handleClickLikeButton = () => {
    mutation.mutate(postId);
  };

  // const post = {
  //   nickname: "userId",
  //   UserId: 2,
  //   postId: 3,
  //   userPhoto:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU",
  //   postPhoto:
  //     "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2021/11/13/mgtFv6a0SQ4L637724194204501826.jpg",
  //   content: "어쩌구저쩌구",
  //   likesCount: 9,
  //   commentsCount: 5,
  //   isLiked: true,
  //   follow: true,
  // };

  return (
    <Stwrap>
      <StFeedTitle>
        <StUserInfo>
          <Story width="42px" imageUrl={userPhoto} userId={UserId}></Story>
          <Link to={`/users/${UserId}`}>{nickname}</Link>
        </StUserInfo>
        <TfiMoreAlt style={{ color: "#222" }} />
      </StFeedTitle>
      <StPhoto>
        <img src={postPhoto} alt="posting-image"></img>
      </StPhoto>
      <StButtons>
        <StLeftCon>
          {post?.isliked ? (
            <button>
              <MdFavorite
                style={{ color: "#ff3040", fontSize: "28px" }}
                onClick={handleClickLikeButton}
              />
            </button>
          ) : (
            <button>
              <MdOutlineFavoriteBorder onClick={handleClickLikeButton} />
            </button>
          )}
          <button>
            <FaRegComment
              style={{
                transform: "scaleX(-1)",
              }}
              onClick={() => {
                navigate(`/main/${postId}`);
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
      <StContent>
        <span>
          <b>좋아요 {likesCount}개</b>
        </span>
        <span
          onClick={() => {
            navigate(`/main/${postId}`);
          }}
        >
          <b>{nickname}</b> {content}
        </span>
        <p
          onClick={() => {
            navigate(`/main/${postId}`);
          }}
        >
          댓글 {commentsCount}개 모두 보기
        </p>
        <p
          onClick={() => {
            navigate(`/main/${postId}`);
          }}
        >
          댓글 달기...
        </p>
      </StContent>
    </Stwrap>
  );
}

export default Feed;
