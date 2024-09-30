import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { liveServer, sendError } from "../constants";
import axios from "axios";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getAdminsLoading: false,
  getAdminsError: false,
  admins: false,
};

export const getAdmins = createAsyncThunk("admin/getAdmins", async () => {
  const accessToken = getAccessToken();
  const url = `${liveServer}/manageadmins`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmins.pending, (state) => {
        state.getAdminsLoading = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.getAdminsLoading = false;
        state.getAdminsError = false;
        state.admins = action.payload;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.getAdminsLoading = false;
        state.getAdminsError = action.error.message;
        state.admins = false;
      });
  },
});

export default adminSlice.reducer;
