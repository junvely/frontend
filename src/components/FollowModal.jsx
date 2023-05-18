import React from "react";
import { followRequest } from "../apis/user";
import { useQuery } from "react-query";
import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

function FollowModal({ userId, showFollow }) {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery("follow", () =>
    followRequest(userId)
  );
  const handleUserClick = (userId) => {
    showFollow();
    navigate(`/users/${userId}`);
  };
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  return (
    <div>
      <Outside onClick={showFollow} />
      <ModalWrap>
        <ModalHeader>
          <IoArrowBack onClick={showFollow} />
          <p>팔로우 목록</p>
          <button onClick={showFollow}>x</button>
        </ModalHeader>
        <FollowList>
          {data?.map((item) => {
            return (
              <li>
                <FollowItem
                  onClick={() => handleUserClick(item.userId)}
                  key={item.nickname}
                >
                  <UserImage src={item.userPhoto} />
                  <UserInfo>
                    <span>{item.nickname}</span>
                  </UserInfo>
                </FollowItem>
              </li>
            );
          })}
        </FollowList>
      </ModalWrap>
    </div>
  );
}

export default FollowModal;

const Outside = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 5;
`;
const ModalWrap = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: white;
  border-radius: 12px;
`;
const FollowList = styled.ul`
  list-style: none;
  padding-left: 1rem;
  font-size: 1.2rem;
  color: #333;
  overflow-y: auto;
`;
const FollowItem = styled.li`
  display: flex;
  align-items: center;
  height: 60px;
  cursor: pointer;
`;

const UserImage = styled.img`
  background-size: cover;
  background-position: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
    margin-right: 0.5rem;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  border-bottom: 1px solid #dbdbdb;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: bold;
  }

  button {
    background-color: white;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: #359fe5;
    &:hover {
      color: #333;
    }
  }
`;
