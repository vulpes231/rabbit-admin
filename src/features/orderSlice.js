import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer, sendError } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getOrderLoading: false,
  getOrderError: false,
  getOrderSuccess: false,
  confirmOrderLoading: false,
  confirmOrderError: false,
  confirmOrderSuccess: false,
  orders: [],
  singleOrderLoading: false,
  singleOrderError: false,
  order: false,
};

export const getOrders = createAsyncThunk("order/getOrders", async () => {
  const accessToken = getAccessToken();
  const url = `${liveServer}/manageorders`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async ({ orderId, formData }) => {
    const accessToken = getAccessToken();
    const url = `${liveServer}/manageorders/${orderId}`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  async (orderId) => {
    // console.log(orderId);
    const accessToken = getAccessToken();
    const url = `${liveServer}/manageorders/${orderId}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetGetOrder(state) {
      state.getOrderLoading = false;
      state.getOrderError = false;
      state.getOrderSuccess = false;

      state.orders = [];
    },
    resetConfirm(state) {
      state.confirmOrderLoading = false;
      state.confirmOrderError = false;
      state.confirmOrderSuccess = false;
    },
    resetSingleOrder(state) {
      state.singleOrderLoading = false;
      state.singleOrderError = false;
      state.order = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.getOrderLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrderLoading = false;
        state.getOrderSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.getOrderLoading = false;
        state.getOrderError = action.error.message;
        state.getOrderSuccess = false;
        state.orders = [];
      });

    builder
      .addCase(confirmOrder.pending, (state) => {
        state.confirmOrderLoading = true;
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

    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.singleOrderLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.singleOrderLoading = false;
        state.singleOrderError = false;
        state.order = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.singleOrderLoading = false;
        state.singleOrderError = action.error.message;
        state.order = false;
      });
  },
});

export const { resetGetOrder, resetConfirm, resetSingleOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
