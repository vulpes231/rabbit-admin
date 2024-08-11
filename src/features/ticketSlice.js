import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getTicketLoading: "",
  getTicketError: "",
  tickets: [],
  ticketDataLoading: false,
  ticketDataError: null,
  ticketData: null,
};

export const getAllTickets = createAsyncThunk(
  "ticket/getAllTickets",
  async () => {
    try {
      const url = `${liveServer}/manageticket`;
      const accessToken = getAccessToken();
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
        const errorMsg = error.response.message.data;
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

export const getTicketData = createAsyncThunk(
  "ticket/getTicketData",
  async (orderId, { rejectWithValue }) => {
    try {
      const url = `${liveServer}/ticket/${orderId}`;

      const accessToken = getAccessToken();

      if (!accessToken) {
        throw new Error("No access token found");
      }

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
        // Return specific error message
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Error creating ticket");
      }
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetGetTicket(state) {
      state.getTicketLoading = false;
      state.getTicketError = false;
      state.tickets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.getTicketLoading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.getTicketLoading = false;
        state.getTicketError = false;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.tickets = [];
        state.getTicketLoading = false;
        state.getTicketError = action.error.message;
      });

    builder
      .addCase(getTicketData.pending, (state) => {
        state.ticketDataLoading = true;
      })
      .addCase(getTicketData.fulfilled, (state, action) => {
        state.ticketDataLoading = false;
        state.ticketDataError = null;
        state.ticketData = action.payload;
      })
      .addCase(getTicketData.rejected, (state, action) => {
        state.ticketDataLoading = false;
        state.ticketDataError = action.error.message;
        state.ticketData = null;
      });
  },
});

export const { resetGetTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
