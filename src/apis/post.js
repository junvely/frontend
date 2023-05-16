/* const config = {
  Headers: {
    "content-type": "multipart/form-data",
  },
};
 */
const postAdd = async ({ content, formData, authorization }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/posts`,
      { content, formData },
      {
        headers: {
          Authorization: `${authorization}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export { postAdd };
