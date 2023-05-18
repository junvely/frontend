import React from "react";
import {
  StFeedCon,
  StFeedList,
  StInnerCon,
  StMainCon,
  StRecommandCon,
  StSideCon,
  StStoryBox,
  StStoryList,
} from "../styles/Pages";
import { StFlexCon } from "../styles/GlobalStyles";
import Story from "../components/Story";
import Feed from "../components/Feed";
import RecommandList from "../components/RecommandList";
import { useQuery } from "react-query";
import { getMainPostsAxios } from "../apis/feed";
import Sidebar from "../components/Sidebar";
import { randomUserAxios } from "../apis/user";

function MainPage() {
  const { data } = useQuery("posts", getMainPostsAxios);
  const storysData = useQuery("randomUser", randomUserAxios);

  return (
    <StMainCon>
      <StSideCon>
        <Sidebar />
      </StSideCon>
      <StInnerCon>
        <StFlexCon>
          <StFeedCon>
            <StStoryList>
              {storysData?.data?.map((user) => {
                return (
                  <StStoryBox key={user.UserId}>
                    <Story
                      width="66px"
                      imageUrl={user.userPhoto}
                      userId={user.UserId}
                    ></Story>
                    <span>{user.nickname}</span>
                  </StStoryBox>
                );
              })}
            </StStoryList>
            <StFeedList>
              {data?.map((post) => {
                return <Feed post={post} key={post.postId} />;
              })}
            </StFeedList>
          </StFeedCon>
          <StRecommandCon>
            <RecommandList></RecommandList>
          </StRecommandCon>
        </StFlexCon>
      </StInnerCon>
    </StMainCon>
  );
}

export default MainPage;
