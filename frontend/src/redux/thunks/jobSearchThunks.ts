import { createAsyncThunk } from "@reduxjs/toolkit";
import { jobSearch } from "../../api/job";
import { IJobSearchResponse, IPost } from "../../types/types";

import { AppState } from "../store/store";

export const jobSearchThunk = createAsyncThunk<
	IJobSearchResponse,
	{ page: number },
	{ state: AppState }
>("job/search", async ({ page }, { getState, rejectWithValue }) => {
	const { searchValue, governorate, remote } = getState().Job.queryFields;
	try {
		const { posts, totalPosts } = await jobSearch(
			searchValue,
			governorate,
			remote,
			page
		);
		return { posts, totalPosts };
	} catch (e) {
		return rejectWithValue(e);
	}
});
