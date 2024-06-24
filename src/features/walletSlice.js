import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getWalletLoading: false,
  getWalletError: false,
  getWalletSuccess: false,
  wallet: [],
};

export const getWallet = createAsyncThunk("wallet/getWallet", async () => {
  try {
    const accessToken = getAccessToken();
    const url = `${devServer}/wallet`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Wallets", response.data);
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

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reset(state) {
      state.getWalletLoading = false;
      state.getWalletError = false;
      state.getWalletSuccess = false;
      state.wallet = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWallet.pending, (state) => {
        state.getWalletLoading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = false;
        state.getWalletSuccess = true;
        state.wallet = action.payload;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = action.error.message;
        state.getWalletSuccess = false;
        state.wallet = [];
      });
  },
});

export const { reset } = walletSlice.actions;
export default walletSlice.reducer;
