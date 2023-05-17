import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { postAdd, postUser } from "../apis/post";
import { styled } from "styled-components";
import { IoArrowBack } from "react-icons/io5";

function PostingModal({ changeModal }) {
  const [content, setContent] = useState("");
  // 이미지 state
  const [postPhoto, setPostPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const { isLoading, isError, data } = useQuery("user", postUser);
  console.log(data);

  // 이미지 첨부
  const addPhoto = (e) => {
    e.preventDefault();
    setPostPhoto(e.target.files[0]);

    // 미리보기
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = () => {
      const previewImgUrl = reader.result;
      setImgUrl(previewImgUrl);
      if (previewImgUrl) {
        setPreviewImage(previewImgUrl);
      }
    };
  };

  const mutationAddPost = useMutation(postAdd, {
    onSuccess: () => {
      alert("게시물을 생성하였습니다.");

      changeModal();
    },
  });
  // 업로드
  const handleUpload = (e) => {
    /*  e.preventDefault(); */
    console.log(postPhoto);
    const formData = new FormData();
    formData.append("postPhoto", postPhoto);
    const postData = {
      content,
      formData,
      postPhoto,
    };
    for (let key of formData.keys()) {
      console.log("키", key);
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log("value", value);
    }

    setPostPhoto(null);
    setPreviewImage(null);
    mutationAddPost.mutate(postData);
    changeModal();
  };

  /*   if (!modal) return null; */

  return (
    <div>
      <Outside />
      <div>
        {/* data 객체가 존재하지 않을 때 로딩 상태 처리 */}
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error occurred.</div>
        ) : (
          <ModalPosition>
            <ModalBox>
              <ModalHeader>
                <IoArrowBack onClick={() => changeModal()} />
                <p>새 게시물 만들기</p>
                <button onClick={handleUpload}>공유하기</button>
              </ModalHeader>
              <ModalContents>
                {imgUrl ? (
                  <div
                    id="img"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${imgUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <UploadImageArea>
                    <h5>업로드할 사진을 선택해주세요</h5>
                    <input
                      style={
                        {
                          /*visibility: "hidden" display: "none" */
                        }
                      }
                      type="file"
                      id="postPhoto"
                      name="postPhoto"
                      accept="image/*"
                      onChange={addPhoto}
                    />
                  </UploadImageArea>
                )}
                <WriteArea>
                  <UserInfo>
                    <UserImage src={data.userPhoto} />
                    <span>{data.nickname}</span>
                  </UserInfo>
                  {/* 작성 영역 */}
                  <TextArea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="문구 입력..."
                  />
                </WriteArea>
              </ModalContents>
            </ModalBox>
          </ModalPosition>
        )}
      </div>
    </div>
  );
}

export default PostingModal;

const Outside = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const TextArea = styled.textarea`
  height: 100%;
  width: 100%;
  background-color: transparent;
  font-size: 15px;
  border: none;
  padding: 0 16px;
  ::placeholder {
    color: #f1f3f7;
    font-family: "Courier New", Courier, monospace;
    font-size: 15px;
    font-weight: bold;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  margin-left: 0.5rem;

  span {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
    white-space: nowrap;
    margin-left: 0.5rem;
    margin-right: 220px;
  }
`;

const UserImage = styled.img`
  background-size: cover;
  background-position: center;
  width: 23px;
  height: 23px;
  border-radius: 50%;
`;
const WriteArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const ModalBox = styled.div`
  width: 1085px;
  height: 655px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: #ffffff;
  text-align: center;
`;

const ModalContents = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr; /* 이미지 영역과 작성 영역의 비율을 설정합니다. */
`;
const UploadImageArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ebe9e9;
`;

const ModalPosition = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadButton = styled.button`
  background-color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: #359fe5;
  &:hover {
    color: #333;
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
