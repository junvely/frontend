import React from "react";
import { StSection } from "../styles/GlobalStyles";
import {
  StMyCon,
  StRecommand,
  StSubtitleCon,
  StUserListCon,
} from "../styles/Components";
import { Link } from "react-router-dom";
import UserRecommand from "./UserRecommand";

function RecommandList() {
  const data = [
    {
      nickname: "userId",
      name: "제니",
      UserId: 2,
      postId: 3,
      userPhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU",
    },
    {
      nickname: "userId",
      name: "제니",
      UserId: 2,
      postId: 3,
      userPhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU",
    },
    {
      nickname: "userId",
      name: "제니",
      UserId: 2,
      postId: 3,
      userPhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU",
    },
    {
      nickname: "userId",
      name: "제니",
      UserId: 2,
      postId: 3,
      userPhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU",
    },
    {
      nickname: "userId",
      name: "제니",
      UserId: 2,
      postId: 3,
      userPhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU",
    },
  ];

  return (
    <StSection>
      <StMyCon>
        <UserRecommand user={data[0]} myProfile={true}></UserRecommand>
      </StMyCon>
      <StRecommand>
        <StSubtitleCon>
          <span>회원님을 위한 추천</span>
          <Link to="#">모두 보기</Link>
        </StSubtitleCon>
        <StUserListCon>
          {data?.map((user) => {
            return <UserRecommand user={user}></UserRecommand>;
          })}
        </StUserListCon>
      </StRecommand>
    </StSection>
  );
}

export default RecommandList;
