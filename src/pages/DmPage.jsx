import { styled } from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import {
  StChat,
  StChatCon,
  StChatInputCon,
  StChatListCon,
} from "../styles/Components";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { postUser } from "../apis/post";

function DmPage() {
  const userData = useQuery("user", postUser);
  const navigate = useNavigate();
  const [input, handleInputChange, resetInput] = useInput("");
  const [chatList, setChatList] = useState([]);

  //   const user = userData ? userData.data.nickname : "USER";

  const socket = io(process.env.REACT_APP_SERVER, {
    cors: {
      origin: "*",
    },
  });

  const handleClickChatSubmit = () => {
    console.log(input);

    if (input) {
      socket.emit("user join", {
        name: "USER",
        room: 1,
      });
      socket.emit("chat message", {
        name: "USER",
        message: input,
        room: 1,
      });
    }
    resetInput();
  };

  socket.on("chat message", (msg) => {
    setChatList([...chatList, msg]);
    window.scrollTo(0, document.body.scrollHeight);
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("소켓 연결 성공");
    });
  });
  //   useEffect(() => {
  //     // 클라이언트 소켓 연결
  //     const socket = io(process.env.REACT_APP_SERVER, {
  //       transports: ["websocket"], // 웹소켓 사용
  //       autoConnect: false, // 초기 연결 비활성화
  //     });

  //     // 소켓 연결 이벤트 처리
  //     socket.on("connect", () => {
  //       console.log("소켓 연결 성공");
  //     });

  //     // 메시지 수신 이벤트 처리
  //     socket.on("chat message", (msg) => {
  //       console.log("msg:", msg);
  //       setChatList((prevChatList) => [...prevChatList, msg]);
  //       window.scrollTo(0, document.body.scrollHeight);
  //     });

  //     // 컴포넌트 언마운트 시 소켓 연결 해제
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  //   const handleClickChatSubmit = () => {
  //     if (input) {
  //       const socket = io("http://localhost:3000");
  //       socket.emit("user join", {
  //         name: "USER",
  //         room: 1,
  //       });
  //       socket.emit("chat message", {
  //         name: "USER",
  //         message: input,
  //         room: 1,
  //       });
  //       resetInput();
  //       socket.disconnect();
  //     }
  //   };

  return (
    <div>
      <Outside />
      <ModalWrap>
        <ModalHeader>
          <IoArrowBack onClick={() => navigate("/main")} />
          <p>DM</p>
          <p>{`USER :USERID`}</p>
        </ModalHeader>
        <StChatCon>
          <StChatListCon>
            <StChat>{`USER:가나다라`}</StChat>
            {chatList?.map((chat) => {
              return <div>{`${chat.name} : ${chat.message}`}</div>;
            })}
          </StChatListCon>
          <StChatInputCon>
            <form onSubmit={(e) => e.preventDefault()}>
              <input value={input} onChange={handleInputChange}></input>
              <button onClick={handleClickChatSubmit}>전송</button>
            </form>
          </StChatInputCon>
        </StChatCon>
      </ModalWrap>
    </div>
  );
}

export default DmPage;

const Outside = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 10;

  button,
  svg,
  i {
    cursor: pointer;
  }
`;
const ModalWrap = styled.div`
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
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
