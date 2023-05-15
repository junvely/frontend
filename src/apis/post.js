const config = {
  Headers: {
    "content-type": "multipart/form-data",
  },
};

//! 게시물 업로드
const postAddd = createAsyncThunk("feed/addFeed", async (payload, thunkAPI) => {
  try {
    const frm = new FormData();
    frm.append("image", payload.image);
    frm.append("contents", payload.contents);

    const response = await axios.post(`${BASE_URL}/feeds`, frm, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const postAdd = async ({ post, authorization }) => {
  try {
    const formData = new FormData();
    formData.append("postPhoto", post.postPhoto);
    formData.append("content", post.content);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/posts`,
      { comment },
      {
        headers: {
          Authorization: `${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export { postAdd };
