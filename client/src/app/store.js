import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import postReducer from "../features/post/postSlice";
import studyGroupReducer from "../features/study-group/studyGroupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: postReducer,
    studyGroups: studyGroupReducer,
  },
});
