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
import { useQuery } from "react-query";
import { getRandomPostsAxios } from "../apis/feed";
import { postUser } from "../apis/post";

function RecommandList() {
  const { isLoading, isError, data } = useQuery("posts", getRandomPostsAxios);
  const list = data ? data.slice(0, 6) : "";
  const userData = useQuery("user", postUser);

  return (
    <StSection>
      <StMyCon>
        {list && (
          <UserRecommand user={userData.data} myProfile={true}></UserRecommand>
        )}
      </StMyCon>
      {list && (
        <StRecommand>
          <StSubtitleCon>
            <span>회원님을 위한 추천</span>
            <Link to="#">모두 보기</Link>
          </StSubtitleCon>
          <StUserListCon>
            {list?.map((user) => {
              return <UserRecommand user={user}></UserRecommand>;
            })}
          </StUserListCon>
        </StRecommand>
      )}
    </StSection>
  );
}

export default RecommandList;
