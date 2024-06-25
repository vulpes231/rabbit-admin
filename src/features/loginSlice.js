import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";

const initialState = {
  loading: false,
  error: false,
  accessToken: null,
  success: false,
  admin: null,
};

export const signinAdmin = createAsyncThunk(
  "signin/signinAdmin",
  async (formData) => {
    try {
      const url = `${liveServer}/login`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg =
          error &&
          error.response &&
          error.response.message &&
          error.response.message.data
            ? error.response.message.data
            : "An error occured.";
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

const loginAdminSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    reset(state) {
      state.accessToken = null;
      state.loading = false;
      state.error = false;
      state.success = false;
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinAdmin.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.error = false;
        state.success = true;
        state.admin = action.payload.adminObj;
      })
      .addCase(signinAdmin.rejected, (state, action) => {
        state.accessToken = null;
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
        state.admin = null;
      });
  },
});

export const { reset } = loginAdminSlice.actions;
export default loginAdminSlice.reducer;
