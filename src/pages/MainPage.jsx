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

function MainPage() {
  const { isLoading, isError, data } = useQuery("posts", getMainPostsAxios);

  const user = [
    "nickName1",
    "nickName2",
    "nickName3",
    "nickName4",
    "nickName5",
    "nickName6",
    "nickName7",
    "nickName8",
  ];

  return (
    <StMainCon>
      <StSideCon></StSideCon>
      <StInnerCon>
        <StFlexCon>
          <StFeedCon>
            <StStoryList>
              {user?.map((user) => {
                return (
                  <StStoryBox>
                    <Story
                      width="66px"
                      imageUrl={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AC83dgCYgZvSZOzrjZ1noTeUgba7A2S2fQ&usqp=CAU"
                      }
                    ></Story>
                    <span>{user}</span>
                  </StStoryBox>
                );
              })}
            </StStoryList>
            <StFeedList>
              {data?.map((post) => {
                return <Feed post={post} />;
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
