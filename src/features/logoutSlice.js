import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  logoutError: false,
  logoutLoading: false,
  logoutSuccess: false,
};

export const logoutAdmin = createAsyncThunk("logout/logoutAdmin", async () => {
  const url = `${liveServer}/managelogout`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errMsg = error.response.message.data;
      throw new Error(errMsg);
    } else {
      throw new Error("Logout failed. try again later");
    }
  }
});

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    resetLogout(state) {
      state.logoutError = false;
      state.logoutLoading = false;
      state.logoutSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAdmin.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutError = false;
        state.logoutSuccess = true;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message;
        state.logoutSuccess = false;
      });
  },
});

export const { resetLogout } = logoutSlice.actions;
export default logoutSlice.reducer;
