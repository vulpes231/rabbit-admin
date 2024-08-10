import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../utils/utilities";
import { devServer } from "../constants";

const initialState = {
  getMessageLoading: false,
  getMessageError: false,
  getMessageSuccess: false,
  chatMessages: [],
  sendMessageLoad: false,
  messageSent: false,
  sendMessageError: false,
};
// devserver;

export const getChatByTicketId = createAsyncThunk(
  "chat/getChatByTicketId",
  async (ticketId) => {
    const url = `${devServer}/chat/${ticketId}`;
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found");
    }

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
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error fetching chat messages");
      }
    }
  }
);

export const userSendMessage = createAsyncThunk(
  "chat/userSendMessage",
  async (formData) => {
    const url = `${devServer}/chat`;
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found");
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error fetching chat messages");
      }
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetGetMsg(state) {
      state.chatMessages = [];
      state.getMessageError = false;
      state.getMessageSuccess = false;
      state.getMessageLoading = false;
    },
    resetSendMsg(state) {
      state.sendMessageError = false;
      state.sendMessageLoad = false;
      state.messageSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSendMessage.pending, (state) => {
        state.sendMessageLoad = true;
      })
      .addCase(userSendMessage.fulfilled, (state) => {
        state.sendMessageLoad = false;
        state.sendMessageError = false;
        state.messageSent = true;
      })
      .addCase(userSendMessage.rejected, (state, action) => {
        state.sendMessageLoad = false;
        state.sendMessageError = action.error.message;
        state.messageSent = false;
      });
    builder
      .addCase(getChatByTicketId.pending, (state) => {
        state.getMessageLoading = true;
      })
      .addCase(getChatByTicketId.fulfilled, (state, action) => {
        state.getMessageLoading = false;
        state.getMessageError = false;
        state.getMessageSuccess = true;
        state.chatMessages = action.payload;
      })
      .addCase(getChatByTicketId.rejected, (state, action) => {
        state.getMessageLoading = false;
        state.getMessageError = action.error.message;
        state.getMessageSuccess = false;
        state.chatMessages = [];
      });
  },
});

export const { resetGetMsg } = chatSlice.actions;
export default chatSlice.reducer;
