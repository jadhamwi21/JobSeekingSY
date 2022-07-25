import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Governorate } from "../../../constants/governorates";
import { IJobSearchResponse } from "../../../types/types";
import { jobSearchThunk } from "../../thunks/jobSearchThunks";
import { IJobSearchReducerState } from "./jobSearchSlice.types";

const initialState: IJobSearchReducerState = {
	loading: false,
	posts: null,
	totalPosts: 0,
	queryFields: {
		governorate: Governorate.Damascus,
		remote: false,
		searchValue: "",
	},
};

const jobSearchSlice = createSlice({
	initialState,
	name: "job_search",
	reducers: {
		setGovernorate: (
			state: IJobSearchReducerState,
			{ payload: governorate }: PayloadAction<Governorate>
		) => {
			state.queryFields.governorate = governorate;
		},
		setRemote: (
			state: IJobSearchReducerState,
			{ payload: remote }: PayloadAction<boolean>
		) => {
			state.queryFields.remote = remote;
		},
		setSearchValue: (
			state: IJobSearchReducerState,
			{ payload: searchValue }: PayloadAction<string>
		) => {
			state.queryFields.searchValue = searchValue;
		},
		setJobSearchLoading: (
			state: IJobSearchReducerState,
			{ payload: jobSearchLoading }: PayloadAction<boolean>
		) => {
			state.loading = jobSearchLoading;
		},
		resetJobSlice: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(jobSearchThunk.pending, (state) => {
			state.loading = true;
			state.posts = null;
		});
		builder.addCase(
			jobSearchThunk.fulfilled,
			(
				state,
				{ payload: { posts, totalPosts } }: PayloadAction<IJobSearchResponse>
			) => {
				state.posts = posts;
				state.totalPosts = totalPosts;
				state.loading = false;
			}
		);
		builder.addCase(jobSearchThunk.rejected, (state) => {
			state.posts = null;
			state.totalPosts = 0;
			state.loading = false;
		});
	},
});

export const {
	setGovernorate,
	setRemote,
	setSearchValue,
	resetJobSlice,
	setJobSearchLoading,
} = jobSearchSlice.actions;

export const JobSearchReducer = jobSearchSlice.reducer;
