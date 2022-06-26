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

// Remove like
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

const postService = {
  createPost,
  getPosts,
  addLike,
  removeLike,
  deletePost,
};

export default postService;
