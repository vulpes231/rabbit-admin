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
  editProductLoading: false,
  editProductError: false,
  editProductSuccess: false,
  deleteProductLoading: false,
  deleteProductError: false,
  deleteProductSuccess: false,
  addFeatLoading: false,
  addFeatError: false,
  addFeatSuccess: false,
  addDescLoading: false,
  addDescError: false,
  addDescSuccess: false,
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
      console.log("Products", response.data);
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

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, formData }) => {
    console.log(id);
    console.log(formData);
    try {
      const accessToken = getAccessToken();
      const url = `${devServer}/manageproducts/edit/${id}`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Products", response.data);
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/manageproducts/delete/${id}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Products", response.data);
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

export const addDescription = createAsyncThunk(
  "product/addDescription",
  async ({ id, formData }) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/manageproducts/addDescription/${id}`;
      const response = await axios.put(url, formData, {
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

export const addFeature = createAsyncThunk(
  "product/addFeature",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/manageproducts/addFeature/${id}`;
      const response = await axios.put(url, formData, {
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
    resetGetProduct(state) {
      state.getProductLoading = false;
      state.getProductError = false;
      state.getProductSuccess = false;
      state.products = [];
    },
    resetCreateProduct(state) {
      state.createProductLoading = false;
      state.createProductError = false;
      state.createProductSuccess = false;
    },
    resetEditProduct(state) {
      state.editProductLoading = false;
      state.editProductError = false;
      state.editProductSuccess = false;
    },
    resetDeleteProduct(state) {
      state.deleteProductLoading = false;
      state.deleteProductError = false;
      state.deleteProductSuccess = false;
    },
    resetAddFeat(state) {
      state.addFeatLoading = false;
      state.addFeatError = false;
      state.addFeatSuccess = false;
    },
    resetAddDesc(state) {
      state.addDescLoading = false;
      state.addDescError = false;
      state.addDescSuccess = false;
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
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.createProductLoading = true;
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

    builder
      .addCase(editProduct.pending, (state) => {
        state.editProductLoading = true;
      })
      .addCase(editProduct.fulfilled, (state) => {
        state.editProductLoading = false;
        state.editProductError = false;
        state.editProductSuccess = true;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.editProductLoading = false;
        state.editProductError = action.error.message;
        state.editProductSuccess = false;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProductLoading = false;
        state.deleteProductError = false;
        state.deleteProductSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductError = action.error.message;
        state.deleteProductSuccess = false;
      });
    builder
      .addCase(addDescription.pending, (state) => {
        state.addDescLoading = true;
      })
      .addCase(addDescription.fulfilled, (state) => {
        state.addDescLoading = false;
        state.addDescError = false;
        state.addDescSuccess = true;
      })
      .addCase(addDescription.rejected, (state, action) => {
        state.addDescLoading = false;
        state.addDescError = action.error.message;
        state.addDescSuccess = false;
      });
    builder
      .addCase(addFeature.pending, (state) => {
        state.addFeatLoading = true;
      })
      .addCase(addFeature.fulfilled, (state) => {
        state.addFeatLoading = false;
        state.addFeatError = false;
        state.addFeatSuccess = true;
      })
      .addCase(addFeature.rejected, (state, action) => {
        state.addFeatLoading = false;
        state.addFeatError = action.error.message;
        state.addFeatSuccess = false;
      });
  },
});

export const { reset, resetEditProduct, resetDeleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
