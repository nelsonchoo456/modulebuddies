import axios from "axios";

const API_URL = "/api/study-group";

// Create a post
const createStudyGroup = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);

  return response.data;
};

// Get study groups
const getStudyGroups = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get study group
const getStudyGroup = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/" + id, config);

  return response.data;
};

// Join study group
const joinStudyGroup = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "/join/" + id, id, config);

  const newResponse = {
    id,
    members: response.data,
  };

  return newResponse;
};

// Leave study group
const leaveStudyGroup = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "/leave/" + id, id, config);

  const newResponse = {
    id,
    members: response.data,
  };

  return newResponse;
};

// Delete post
const deleteStudyGroup = async (id, token) => {
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

const studyGroupService = {
  createStudyGroup,
  getStudyGroups,
  getStudyGroup,
  joinStudyGroup,
  leaveStudyGroup,
  deleteStudyGroup,
};

export default studyGroupService;
