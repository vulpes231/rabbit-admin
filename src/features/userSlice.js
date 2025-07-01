import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
	getUserLoading: false,
	getUserError: false,
	users: [],
};

export const getUsers = createAsyncThunk("user/getUsers", async (formData) => {
	try {
		const accessToken = getAccessToken();
		const url = `${liveServer}/manageusers`;
		const response = await axios.get(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});
		// console.log("Users", response.data);
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

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset(state) {
			state.getUserLoading = false;
			state.getUserError = false;
			state.users = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.getUserLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = false;
				state.users = action.payload.users;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = action.error.message;
				state.users = [];
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
