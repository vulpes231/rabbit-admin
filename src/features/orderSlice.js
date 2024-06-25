import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getOrderLoading: false,
  getOrderError: false,
  getOrderSuccess: false,
  confirmOrderLoading: false,
  confirmOrderError: false,
  confirmOrderSuccess: false,
  orders: [],
};

export const getOrders = createAsyncThunk("order/getOrders", async () => {
  try {
    const accessToken = getAccessToken();
    const url = `${liveServer}/manageorders`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("Trnx", response.data);
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

export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (FormData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/manageorders`;
      const response = await axios.put(url, FormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("Trnx", response.data);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset(state) {
      state.getOrderLoading = false;
      state.getOrderError = false;
      state.getOrderSuccess = false;
      state.confirmOrderLoading = false;
      state.confirmOrderError = false;
      state.confirmOrderSuccess = false;
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.getOrderLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrderLoading = false;
        state.getOrderError = false;
        state.getOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.getOrderLoading = false;
        state.getOrderError = action.error.message;
        state.getOrderSuccess = false;
        state.orders = [];
      })
      .addCase(confirmOrder.pending, (state) => {
        state.confirmOrderLoading = false;
      })
      .addCase(confirmOrder.fulfilled, (state) => {
        state.confirmOrderLoading = false;
        state.confirmOrderError = false;
        state.confirmOrderSuccess = true;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.confirmOrderLoading = false;
        state.confirmOrderError = action.error.message;
        state.confirmOrderSuccess = false;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
