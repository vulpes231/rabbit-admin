import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getProductLoading: false,
  getProductError: false,
  getProductSuccess: false,
  createProductLoading: false,
  createProductError: false,
  createProductSuccess: false,
  products: [],
};

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const accessToken = getAccessToken();
    const url = `${liveServer}/products`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("Products", response.data);
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

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (FormData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/manageproducts/create`;
      const response = await axios.post(url, FormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("Products", response.data);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset(state) {
      state.getProductLoading = false;
      state.getProductError = false;
      state.getProductSuccess = false;
      state.createProductLoading = false;
      state.createProductError = false;
      state.createProductSuccess = false;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.getProductLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductLoading = false;
        state.getProductError = false;
        state.getProductSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductLoading = false;
        state.getProductError = action.error.message;
        state.getProductSuccess = false;
        state.products = [];
      })
      .addCase(createProduct.pending, (state) => {
        state.createProductLoading = false;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createProductLoading = false;
        state.createProductError = false;
        state.createProductSuccess = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductLoading = false;
        state.createProductError = action.error.message;
        state.createProductSuccess = false;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
