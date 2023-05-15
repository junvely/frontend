import React, { useState } from "react";

function PostingModal() {
  const token = localStorage.getItem("accessToken");
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(flase);
  };

  const imgInput = useRef();
  const [post, setPost] = useState({ postPhoto: "", content: "" });

  // 이미지 state
  const [UploadImageForm, setUploadImageForm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  // 이미지 첨부
  const imgHandler = (e) => {
    setUploadImageForm(e.target.files[0]);

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

  // 본문
  const handleSetPost = (e) => {
    const value = e.target.value;
    setPost({ ...post, image: UploadImageForm, contents: value });
  };

  // 업로드
  const handleUpload = () => {
    dispatch(__addFeed(post));
    dispatch(updateIsModalOpen());
    setUploadImageForm(null);
    setPreviewImage(null);
  };

  if (!isModalOpen) return null;

  return (
    <div>
      // 모달 뒷배경을 눌렀을 때 모달이 사라짐
      <Outside onClick={closeModal} />
      {/* 닫기 버튼 */}
      <button
        variant="closeModalBtn"
        onClick={(e) => {
          setModal(false);
          setImgUrl(null);
        }}
      />
      {/* 모달창 */}
      <div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant="modalBox"
        >
          {/* 모달창 헤더 */}
          <div variant="modalHeader">
            <Image
              onClick={() => {
                dispatch(updateIsModalOpen());
              }}
              variant="goBackIcon"
            />
            <p>새 게시물 만들기</p>
            <button onClick={handleUpload}>공유하기</button>
          </div>

          {/* 모달창 컨텐츠 영역 */}
          <div variant="modalContents">
            {/* 모달창 왼쪽: 사진 업로드 영역 */}
            {/* 업로드 안내 또는 이미지 미리보기 */}
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
              <div variant="uploadImageArea">
                <Image variant="uploadImageIcon" />
                <h2>업로드할 사진을 선택해주세요.</h2>
                <input
                  style={{ visibility: "hidden", display: "none" }}
                  ref={imgInput}
                  type="file"
                  accept="image/*"
                  onChange={imgHandler}
                />
                <button
                  onClick={() => {
                    imgInput.current.click();
                  }}
                  variant="smallBlue"
                >
                  컴퓨터에서 선택
                </button>
              </div>
            )}
            {/* 모달창 오른쪽: 게시글 작성 영역 */}
            <div variant="modalWriteArea">
              {/* 프로필 */}
              <div variant="photoAndId">
                <Margin margin="0 12px 0 16px">
                  <Image variant="profileDefaultIcon" />
                </Margin>
                <span>{memberId}</span>
              </div>

              {/* 작성 영역 */}
              <TextArea onChange={handleSetPost} placeholder="문구 입력..." />
            </div>
          </div>
        </div>
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

const TextArea = styled.input`
  height: 100%;
  background-color: transparent;
  padding: 0 16px;
  ::placeholder {
    color: #bec3c9;
  }
`;
