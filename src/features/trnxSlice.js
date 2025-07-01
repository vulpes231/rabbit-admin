import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
	getTrnxLoading: false,
	getTrnxError: false,
	trnxs: [],
	completeTrnxLoading: false,
	completeTrnxError: false,
	trnxCompleted: false,
};

export const getTrnxs = createAsyncThunk("trnx/getTrnxs", async () => {
	try {
		const accessToken = getAccessToken();
		const url = `${liveServer}/managetrnxs`;
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

export const completeTransaction = createAsyncThunk(
	"trnx/completeTransaction",
	async (formData) => {
		const accessToken = getAccessToken();
		const url = `${liveServer}/managetrnxs`;
		try {
			console.log(formData);
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

const trnxSlice = createSlice({
	name: "trnx",
	initialState,
	reducers: {
		resetComplete(state) {
			state.completeTrnxError = false;
			state.completeTrnxLoading = false;
			state.trnxCompleted = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTrnxs.pending, (state) => {
				state.getTrnxLoading = true;
			})
			.addCase(getTrnxs.fulfilled, (state, action) => {
				state.getTrnxLoading = false;
				state.getTrnxError = false;
				state.trnxs = action.payload.trnx;
			})
			.addCase(getTrnxs.rejected, (state, action) => {
				state.getTrnxLoading = false;
				state.getTrnxError = action.error.message;
				state.trnxs = [];
			});

		builder
			.addCase(completeTransaction.pending, (state) => {
				state.completeTrnxLoading = true;
			})
			.addCase(completeTransaction.fulfilled, (state) => {
				state.completeTrnxLoading = false;
				state.completeTrnxError = false;
				state.trnxCompleted = true;
			})
			.addCase(completeTransaction.rejected, (state, action) => {
				state.completeTrnxLoading = false;
				state.completeTrnxError = action.error.message;
				state.trnxCompleted = false;
			});
	},
});

export const { resetComplete } = trnxSlice.actions;
export default trnxSlice.reducer;
