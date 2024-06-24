import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
};

export const signupAdmin = createAsyncThunk(
  "signup/signupAdmin",
  async (formData) => {
    try {
      const url = `${liveServer}/create`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
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
    reset(state) {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { reset } = signupAdminSlice.actions;
export default signupAdminSlice.reducer;
