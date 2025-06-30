import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";

const initialState = {
	signinLoading: false,
	signinError: false,
	accessToken: false,
	signedIn: false,
	admin: false,
};

export const signinAdmin = createAsyncThunk(
	"signin/signinAdmin",
	async (formData) => {
		try {
			const url = `${liveServer}/login`;
			const response = await axios.post(url, formData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);
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

const loginAdminSlice = createSlice({
	name: "signin",
	initialState,
	reducers: {
		resetLogin(state) {
			state.accessToken = false;
			state.signinLoading = false;
			state.signinError = false;
			state.signedIn = false;
			state.admin = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signinAdmin.pending, (state) => {
				state.signinLoading = true;
			})
			.addCase(signinAdmin.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.signinLoading = false;
				state.signinError = false;
				state.signedIn = true;
				state.admin = action.payload.adminObj;
			})
			.addCase(signinAdmin.rejected, (state, action) => {
				state.accessToken = null;
				state.signinLoading = false;
				state.signinError = action.error.message;
				state.signedIn = false;
				state.admin = null;
			});
	},
});

export const { resetLogin } = loginAdminSlice.actions;
export default loginAdminSlice.reducer;
