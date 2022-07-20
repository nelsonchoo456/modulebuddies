import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studyGroupService from "./studyGroupService";

const initialState = {
  studyGroups: [],
  studyGroup: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create study group
export const createStudyGroup = createAsyncThunk(
  "studyGroups/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studyGroupService.createStudyGroup(postData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get study groups
export const getStudyGroups = createAsyncThunk(
  "studyGroups/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studyGroupService.getStudyGroups(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get study group
export const getStudyGroup = createAsyncThunk(
  "studyGroups/getStudyGroup",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studyGroupService.getStudyGroup(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete study group
export const deleteStudyGroup = createAsyncThunk(
  "studyGroups/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studyGroupService.deleteStudyGroup(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Join study group
export const joinStudyGroup = createAsyncThunk(
  "studyGroups/join",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studyGroupService.joinStudyGroup(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Leave study group
export const leaveStudyGroup = createAsyncThunk(
  "studyGroups/leave",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studyGroupService.leaveStudyGroup(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const studyGroupSlice = createSlice({
  name: "studyGroups",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudyGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudyGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studyGroups.push(action.payload);
      })
      .addCase(createStudyGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudyGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudyGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studyGroups = action.payload;
      })
      .addCase(getStudyGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudyGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudyGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studyGroup = action.payload;
      })
      .addCase(getStudyGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(joinStudyGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(joinStudyGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studyGroups = state.studyGroups.map((studyGroup) =>
          studyGroup._id === action.payload.id
            ? { ...studyGroup, members: action.payload.members }
            : studyGroup
        );
      })
      .addCase(joinStudyGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(leaveStudyGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(leaveStudyGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studyGroups = state.studyGroups.map((studyGroup) =>
          studyGroup._id === action.payload.id
            ? { ...studyGroup, members: action.payload.members }
            : studyGroup
        );
      })
      .addCase(leaveStudyGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStudyGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudyGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studyGroups = state.studyGroups.filter(
          (studyGroup) => studyGroup._id !== action.payload.id
        );
      })
      .addCase(deleteStudyGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = studyGroupSlice.actions;
export default studyGroupSlice.reducer;
