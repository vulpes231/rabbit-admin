import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getAddressLoading: false,
  getAddressError: false,
  addresses: false,
  updateAddressLoading: false,
  updateAddressError: false,
  addressUpdated: false,
};

export const getAllAddresses = createAsyncThunk(
  "address/getAllAddresses",
  async () => {
    const url = `${liveServer}/manageaddress`;
    const accessToken = getAccessToken();
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
      if (error.response) {
        const errMsg = error.response.message.data;
        throw new Error(errMsg);
      }
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ rowId, formData }) => {
    const url = `${liveServer}/manageaddress/${rowId}`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errMsg = error.response.message.data;
        throw new Error(errMsg);
      }
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddressUpdate(state) {
      state.updateAddressLoading = false;
      state.updateAddressError = false;
      state.addressUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddresses.pending, (state) => {
        state.getAddressLoading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.getAddressLoading = false;
        state.getAddressError = false;
        state.addresses = action.payload.walletAddress;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.getAddressLoading = false;
        state.getAddressError = action.error.message;
        state.addresses = false;
      });
    builder
      .addCase(updateAddress.pending, (state) => {
        state.updateAddressLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.updateAddressLoading = false;
        state.updateAddressError = false;
        state.addressUpdated = true;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.updateAddressLoading = false;
        state.updateAddressError = action.error.message;
        state.addressUpdated = false;
      });
  },
});

export const { resetAddressUpdate } = addressSlice.actions;
export default addressSlice.reducer;
