import React, { useState } from "react";
import styled from "styled-components";
import { MdHomeFilled } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { HiOutlineHeart } from "react-icons/hi";
import { FiPlusSquare } from "react-icons/fi";
import { AiOutlineCompass } from "react-icons/ai";
import { useNavigate } from "react-router";
import PostingModal from "./PostingModal";
import { postUser } from "../apis/post";
import { useQuery } from "react-query";
import SearchToggle from "./SearchToggle";
import instagram from "../img/instagram.png";

function Sidebar() {
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoading, isError, data } = useQuery("user", postUser);

  const changeModal = () => {
    setModal(!modal);
  };

  const searchBarToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {isSearchOpen && (
        <SearchToggle isSearchOpen={isSearchOpen}></SearchToggle>
      )}
      <SidebarContainer>
        <Logo src={instagram} alt="로고" />
        <SidebarContent>
          <TabButton
            onClick={() => {
              navigate("/main");
            }}
          >
            <MdHomeFilled />
            <TabText>홈</TabText>
          </TabButton>
          <TabButton>
            <BiSearch onClick={searchBarToggle} />
            <TabText>검색</TabText>
          </TabButton>
          <TabButton
            onClick={() => {
              navigate("/random");
            }}
          >
            <AiOutlineCompass />
            <TabText>탐색</TabText>
          </TabButton>
          <TabButton>
            <IoPaperPlaneOutline />
            <TabText>메시지</TabText>
          </TabButton>
          <TabButton>
            <HiOutlineHeart />
            <TabText>알림</TabText>
          </TabButton>
          <TabButton onClick={changeModal}>
            <FiPlusSquare />
            <TabText>만들기</TabText>
          </TabButton>
          {modal && (
            <>
              <PostingModal changeModal={changeModal} />
            </>
          )}
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error occurred.</div>
          ) : (
            <TabButton
              onClick={() => {
                navigate(`/users/${userId}`);
              }}
            >
              <UserImage src={data.userPhoto} />
              <TabText>프로필</TabText>
            </TabButton>
          )}
        </SidebarContent>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
const SidebarContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: white;
  border-right: 1px solid #d3d2d2;
  padding: 20px;
  padding-right: 30px;
  overflow-y: auto;
  position: relative;
`;

const Logo = styled.img`
  width: 170px;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 0;

  background-color: transparent;
  border: none;
  font-size: 25px;
  margin-bottom: 30px;

  &:hover {
    background-color: #ececec;
    border-radius: 8px;
  }
`;

const TabText = styled.span`
  font-size: 20px;
  margin-left: 20px;
`;

const LogoutButton = styled.button`
  margin-top: auto;
`;
const UserImage = styled.img`
  object-fit: cover;
  width: 27px;
  height: 27px;
  border-radius: 50%;
`;
