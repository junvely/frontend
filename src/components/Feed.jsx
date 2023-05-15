import React from "react";
import { StFlexCon, Stwrap } from "../styles/GlobalStyles";
import Story from "./Story";
import { FaCertificate } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";
import {
  StButtons,
  StContent,
  StFeedTitle,
  StLeftCon,
  StPhoto,
  StUserId,
  StUserInfo,
} from "../styles/Components";
import { MdFavorite } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { GrBookmark } from "react-icons/gr";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { putLikeAxios } from "../apis/feed";
import { Link } from "react-router-dom";

function Feed({}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(putLikeAxios, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleClickLikeButton = (postId) => {
    mutation.mutate(postId);
  };

  const post = {
    nickname: "userId",
    UserId: 2,
    postId: 3,
    userPhoto:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU",
    postPhoto:
      "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2021/11/13/mgtFv6a0SQ4L637724194204501826.jpg",
    content: "어쩌구저쩌구",
    likesCount: 9,
    commentsCount: 5,
    isLiked: true,
    follow: true,
  };

  return (
    <Stwrap>
      <StFeedTitle>
        <StUserInfo>
          <Story width="42px" imageUrl={post.userPhoto}></Story>
          <Link to={`/user/:${post.UserId}`}>{post.nickname}</Link>
        </StUserInfo>
        <TfiMoreAlt style={{ color: "#222" }} />
      </StFeedTitle>
      <StPhoto>
        <img src={post.postPhoto} alt="posting-image"></img>
      </StPhoto>
      <StButtons>
        <StLeftCon>
          {post.isLiked ? (
            <button>
              <MdFavorite
                style={{ color: "#ff3040", fontSize: "28px" }}
                onClick={() => handleClickLikeButton(post.postId)}
              />
            </button>
          ) : (
            <button>
              <MdOutlineFavoriteBorder
                onClick={() => handleClickLikeButton(post.postId)}
              />
            </button>
          )}
          <button>
            <FaRegComment
              style={{
                transform: "scaleX(-1)",
              }}
              onClick={() => {
                navigate(`/main/:${post.UserId}`);
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
          <b>좋아요 {post.likesCount}개</b>
        </span>
        <span
          onClick={() => {
            navigate(`/main/:${post.UserId}`);
          }}
        >
          <b>{post.nickname}</b> {post.content}
        </span>
        <p
          onClick={() => {
            navigate(`/main/:${post.UserId}`);
          }}
        >
          댓글 {post.commentsCount}개 모두 보기
        </p>
        <p
          onClick={() => {
            navigate(`/main/:${post.UserId}`);
          }}
        >
          댓글 달기...
        </p>
      </StContent>
    </Stwrap>
  );
}

export default Feed;
