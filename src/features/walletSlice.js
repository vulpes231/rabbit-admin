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
  suspendLoading: false,
  suspendError: false,
  suspended: false,
  unSuspendLoading: false,
  unSuspendError: false,
  unSuspended: false,
};

export const getAllWallets = createAsyncThunk(
  "wallet/getAllWallets",
  async () => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/managewallets`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("Wallets", response.data);
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

export const suspendWallet = createAsyncThunk(
  "wallet/suspendWallet",
  async (walletId) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/managewallets/${walletId}`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("Wallets", response.data);
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
export const unSuspendWallet = createAsyncThunk(
  "wallet/unSuspendWallet",
  async (walletId) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/managewallets/${walletId}`;
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
      // console.log("Wallets", response.data);
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
  "wallet/confirmDeposit",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/managetrnxs`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
    resetConfirmTrnx(state) {
      state.confirmDepositLoading = false;
      state.confirmDepositError = false;
      state.confirmDepositSuccess = false;
    },
    resetSuspend(state) {
      state.suspendError = false;
      state.suspendLoading = false;
      state.suspended = false;
    },
    resetUnSuspend(state) {
      state.unSuspendError = false;
      state.unSuspendLoading = false;
      state.unSuspended = false;
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
      });

    builder
      .addCase(confirmDeposit.pending, (state) => {
        state.confirmDepositLoading = true;
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
    builder
      .addCase(suspendWallet.pending, (state) => {
        state.suspendLoading = true;
      })
      .addCase(suspendWallet.fulfilled, (state) => {
        state.suspendLoading = false;
        state.suspendError = false;
        state.suspended = true;
      })
      .addCase(suspendWallet.rejected, (state, action) => {
        state.suspendLoading = false;
        state.suspendError = action.error.message;
        state.suspended = false;
      });
    builder
      .addCase(unSuspendWallet.pending, (state) => {
        state.unSuspendLoading = true;
      })
      .addCase(unSuspendWallet.fulfilled, (state) => {
        state.unSuspendLoading = false;
        state.unSuspendError = false;
        state.unSuspended = true;
      })
      .addCase(unSuspendWallet.rejected, (state, action) => {
        state.unSuspendLoading = false;
        state.unSuspendError = action.error.message;
        state.unSuspended = false;
      });
  },
});

export const { reset, resetConfirmTrnx, resetSuspend, resetUnSuspend } =
  walletSlice.actions;
export default walletSlice.reducer;
