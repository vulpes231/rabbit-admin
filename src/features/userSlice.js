import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getLoading: false,
  getError: false,
  getSuccess: false,
  users: [],
};

export const getUsers = createAsyncThunk("user/getUsers", async (formData) => {
  try {
    const accessToken = getAccessToken();
    const url = `${liveServer}/manageusers`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("Users", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data.message;
      throw new Error(errorMsg);
    } else {
      throw error;
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset(state) {
      state.getLoading = false;
      state.getError = false;
      state.getSuccess = false;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.getLoading = false;
        state.getError = false;
        state.getSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.getLoading = false;
        state.getError = action.error.message;
        state.getSuccess = false;
        state.users = [];
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
