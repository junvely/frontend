import Story from "../components/Story";

import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useInput } from "../hooks/useInput";
import {
  StInputCon,
  StResult,
  StResultCon,
  StSearchCon,
  StSearchInnerCon,
  StTitle,
  StUserCon,
  StUserNameCon,
} from "../styles/Components";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { searchUserAxios } from "../apis/user";

function SearchToggle() {
  const navigate = useNavigate();
  const [input, searchInputChange] = useInput();
  const { data, refetch } = useQuery("search", () => searchUserAxios(input), {
    enabled: false,
  });

  const [searchList, setSearchList] = useState(data);

  console.log("data:", data);
  console.log("searchList:", searchList);

  const handleClickSearchData = (e) => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setSearchList(data);
    }
  }, [data]);

  return (
    <StSearchCon>
      <StSearchInnerCon>
        <h5>검색</h5>
      </StSearchInnerCon>
      <StInputCon>
        <CiSearch
          styled={{ width: "30px", color: "#737373" }}
          onClick={handleClickSearchData}
        />
        <input
          type="text"
          value={input}
          onChange={searchInputChange}
          placeHolder="검색"
        ></input>
      </StInputCon>
      <StResultCon>
        <StResult>
          <StTitle>유저 검색</StTitle>
          {searchList?.users?.map((search) => {
            return (
              <>
                <StUserCon onClick={() => navigate(`/posts/${search.UserId}`)}>
                  <Story
                    width="54px"
                    imageUrl={search.userPhoto}
                    userId="2"
                  ></Story>
                  <StUserNameCon>
                    <span> {search.nickname}</span>
                    <p> {search.name}</p>
                  </StUserNameCon>
                </StUserCon>
              </>
            );
          })}
        </StResult>
        <StResult>
          <StTitle>게시물 검색</StTitle>
          {searchList?.posts?.map((search) => {
            return (
              <>
                <StUserCon onClick={() => navigate(`/main/${search.postId}`)}>
                  <Story
                    width="54px"
                    imageUrl={search.postPhoto}
                    userId="2"
                  ></Story>
                  <StUserNameCon>
                    <span> {search.content}</span>
                    <p> {search.name}</p>
                  </StUserNameCon>
                </StUserCon>
              </>
            );
          })}
        </StResult>
      </StResultCon>
    </StSearchCon>
  );
}

export default SearchToggle;
