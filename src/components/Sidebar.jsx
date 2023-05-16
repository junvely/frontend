import React, { useState } from "react";
import styled from "styled-components";
import { MdHomeFilled } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io";
import { HiOutlineHeart } from "react-icons/hi";
import { FiPlusSquare } from "react-icons/fi";
import { AiOutlineCompass } from "react-icons/ai";
import { useNavigate } from "react-router";
import PostingModal from "./PostingModal";

function Sidebar() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  return (
    <SidebarContainer>
      <Logo src="로고 이미지 URL" alt="로고" />

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
          <BiSearch />
          <TabText>검색</TabText>
        </TabButton>
        <TabButton>
          <AiOutlineCompass />
          <TabText>탐색</TabText>
        </TabButton>
        {/* <TabButton>
          <TabIcon src="아이콘 이미지 URL" alt="아이콘" />
          <TabText>릴스</TabText>
        </TabButton> */}
        <TabButton>
          <IoPaperPlaneOutline />
          <TabText>메시지</TabText>
        </TabButton>
        <TabButton>
          <HiOutlineHeart />
          <TabText>알림</TabText>
        </TabButton>
        <TabButton onClick={openModal}>
          <FiPlusSquare />
          <TabText>만들기</TabText>
          {modal && <PostingModal setModal={setModal} />}
        </TabButton>
        <TabButton>
          <TabIcon src="아이콘 이미지 URL" alt="아이콘" />
          <TabText>프로필</TabText>
        </TabButton>
      </SidebarContent>
    </SidebarContainer>
  );
}

export default Sidebar;
const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #f0f0f0;
  border-right: 1px solid #d3d2d2;
  padding: 20px;
  padding-right: 30px;
  overflow-y: auto;
`;

const Logo = styled.img``;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: transparent;
  border: none;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const TabText = styled.span`
  font-size: 20px;
`;

const LogoutButton = styled.button`
  margin-top: auto;
`;
