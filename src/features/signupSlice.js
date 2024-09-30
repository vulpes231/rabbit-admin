import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  createAdminLoading: false,
  createAdminError: false,
  adminCreated: false,
};

export const signupAdmin = createAsyncThunk(
  "signup/signupAdmin",
  async (formData) => {
    const accessToken = getAccessToken();
    try {
      const url = `${liveServer}/enroll`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

const signupAdminSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetCreateAdmin(state) {
      state.createAdminLoading = false;
      state.createAdminError = false;
      state.adminCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAdmin.pending, (state) => {
        state.createAdminLoading = true;
      })
      .addCase(signupAdmin.fulfilled, (state) => {
        state.createAdminLoading = false;
        state.createAdminError = false;
        state.adminCreated = true;
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.createAdminLoading = false;
        state.createAdminError = action.error.message;
        state.adminCreated = false;
      });
  },
});

export const { resetCreateAdmin } = signupAdminSlice.actions;
export default signupAdminSlice.reducer;
