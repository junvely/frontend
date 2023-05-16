import React, { useState } from "react";
import { useMutation } from "react-query";
import { postAdd } from "../apis/post";
import { styled } from "styled-components";
import { IoArrowBack } from "react-icons/io5";

function PostingModal({ setModal }) {
  const token = sessionStorage.getItem("accessToken");
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const imgInput = useRef();
  /*   const [post, setPost] = useState({ postPhoto: "", content: "" }); */
  const post = {
    postPhoto,
    content,
  };
  const mutationAddPost = useMutation(postAdd, {
    onSuccess: (response) => {
      alert("게시물을 생성하였습니다.");
      closeModal();
    },
  });
  const [content, setContent] = useState("");
  // 이미지 state
  const [postPhoto, setPostPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  // 이미지 첨부
  const addPhoto = (e) => {
    e.preventDefault();
    setPostPhoto(e.target.files[0]);

    console.log(postPhoto);
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

  /*   // 본문
  const handleSetPost = (e) => {
    const value = e.target.value;
    setPost({ ...post, image: postPhoto, contents: value });
  }; */

  // 업로드
  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(postPhoto);
    console.log(content);
    formData.append("postPhoto", postPhoto);

    setPostPhoto(null);
    setPreviewImage(null);
    mutationAddPost.mutate({ content, formData, authorization });
  };

  if (!isModalOpen) return null;

  return (
    <div>
      // 모달 뒷배경을 눌렀을 때 모달이 사라짐
      <Outside onClick={closeModal} />
      <button
        onClick={(e) => {
          setModal(false);
          setImgUrl(null);
        }}
      />
      {/* 모달창 */}
      <ModalPosition>
        <ModalBox>
          <ModalHeader>
            <IoArrowBack onClick={closeModal} />
            <p>새 게시물 만들기</p>
            <button onClick={handleUpload}>공유하기</button>
          </ModalHeader>

          {/* 모달창 컨텐츠 영역 */}
          <ModalContents>
            {/* 모달창 왼쪽: 사진 업로드 영역 */}
            {/* 업로드 안내 or 이미지 미리보기 */}
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
                <Image variant="uploadImageIcon" />
                <h2>업로드할 사진을 선택해주세요.</h2>
                <input
                  style={{ visibility: "hidden", display: "none" }}
                  type="file"
                  id="postPhoto"
                  accept="image/*"
                  onChange={addPhoto}
                />
                {/*<label htmlFor="postPhoto" onClick={addphoto}>
                  컴퓨터에서 선택
                </label> */}
                <button onClick={addPhoto}>컴퓨터에서 선택</button>
              </UploadImageArea>
            )}
            {/* 모달창 오른쪽: 게시글 작성 영역 */}
            <WriteArea>
              <UserInfo>
                <UserImage />
                <span>{user.nickname}</span>
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
  background-color: transparent;
  padding: 0 16px;
  ::placeholder {
    color: #bec3c9;
  }
`;
// UserInfo 컴포넌트
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;

  span {
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    display: inline-block; /* span 요소가 블록 레벨 요소로 동작하게 만듭니다. */
    width: 200px; /* 고정된 가로 길이를 지정합니다. */
    /*  overflow: hidden; 가로 길이를 넘어가는 내용을 자르고 숨깁니다. */
    white-space: nowrap; /* 공백 문자를 처리하지 않고 모든 문자를 한 줄로 표시합니다. */
  }
`;
const UserImage = styled.div`
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 1rem;
`;
const ModalBox = styled.div`
  width: 696px;
  height: 420px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: #ffffff;
  text-align: center;
`;
const ModalHeader = styled.div`
  width: 100%;
  height: 42px;
  border-bottom: 1px solid #dbdbdb;
  padding: 0 16px;
  justify-content: space-between;
`;
const ModalContents = styled.div`
  width: 100%;
  height: 100%;
`;
const UploadImageArea = styled.div`
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-right: 1px solid #dbdbdb;
`;
const WriteArea = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
const ModalPosition = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  /*   top: 0; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 20;
  justify-content: center;
  align-items: center;
`;
