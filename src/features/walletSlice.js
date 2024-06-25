import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getAllWalletsLoading: false,
  getAllWalletsError: false,
  getWalletSuccess: false,
  confirmDepositLoading: false,
  confirmDepositError: false,
  confirmDepositSuccess: false,
  wallets: [],
};

export const getAllWallets = createAsyncThunk(
  "wallet/getAllWallets",
  async () => {
    try {
      const accessToken = getAccessToken();
      const url = `${devServer}/managewallets`;
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
  }
);

export const confirmDeposit = createAsyncThunk(
  "order/getOrders",
  async (transactionId) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/managewallets/${transactionId}`;
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
      console.log("Trnx", response.data);
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

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reset(state) {
      state.getAllWalletsLoading = false;
      state.getAllWalletsError = false;
      state.getWalletSuccess = false;
      state.wallets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWallets.pending, (state) => {
        state.getAllWalletsLoading = true;
      })
      .addCase(getAllWallets.fulfilled, (state, action) => {
        state.getAllWalletsLoading = false;
        state.getAllWalletsError = false;
        state.getWalletSuccess = true;
        state.wallets = action.payload;
      })
      .addCase(getAllWallets.rejected, (state, action) => {
        state.getAllWalletsLoading = false;
        state.getAllWalletsError = action.error.message;
        state.getWalletSuccess = false;
        state.wallets = [];
      })
      .addCase(confirmDeposit.pending, (state) => {
        state.confirmDepositLoading = false;
      })
      .addCase(confirmDeposit.fulfilled, (state) => {
        state.confirmDepositLoading = false;
        state.confirmDepositError = false;
        state.confirmDepositSuccess = true;
      })
      .addCase(confirmDeposit.rejected, (state, action) => {
        state.confirmDepositLoading = false;
        state.confirmDepositError = action.error.message;
        state.confirmDepositSuccess = false;
      });
  },
});

export const { reset } = walletSlice.actions;
export default walletSlice.reducer;
