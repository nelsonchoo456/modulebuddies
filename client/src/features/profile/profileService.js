import axios from "axios";

const API_URL = "/api/profile/";

// Create new profile
const createProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, profileData, config);

  return response.data;
};

// Get profile
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "me", config);

  if (response.data) {
    localStorage.setItem("profile", JSON.stringify(response.data));
  }
  return response.data;
};

const profileService = {
  createProfile,
  getProfile,
};

export default profileService;
