import axios from "axios";

const API_URL = "/api/posts";

// Create a post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);

  return response.data;
};

// Get posts
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get post
const getPost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/" + id, config);

  return response.data;
};

// Add like
const addLike = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "/like/" + id, id, config);

  const newResponse = {
    id,
    likes: response.data,
  };

  return newResponse;
};

// Remove like
const removeLike = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "/unlike/" + id, id, config);

  const newResponse = {
    id,
    likes: response.data,
  };

  return newResponse;
};

// Delete post
const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "/" + id, config);

  const newResponse = {
    id,
  };

  return newResponse;
};

// Add comment
const addComment = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/comment/" + postData.postID,
    postData,
    config
  );

  return response.data;
};

// Remove comment
const removeComment = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + `/comment/${postData.postID}/${postData._id}`,
    config
  );

  const commentID = postData.commentID;

  const newResponse = {
    commentID,
  };

  return newResponse;
};

const postService = {
  createPost,
  getPosts,
  getPost,
  addLike,
  removeLike,
  deletePost,
  addComment,
  removeComment,
};

export default postService;
