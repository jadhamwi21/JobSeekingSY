import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyProfileDetails } from "../../api/profile";
import { IGetProfileDetailsResponse } from "../../types/types";
import { appendDateToForceFetchProfilePicture } from "../../utils/utils";
import { AppState } from "../store/store";

export const getMyProfileDetailsThunk = createAsyncThunk<
	IGetProfileDetailsResponse,
	void,
	{ state: AppState; rejectWithValue: unknown }
>("profile/details", async (_, { rejectWithValue }) => {
	try {
		const { details } = await getMyProfileDetails();
		if (details.profile_picture)
			details.profile_picture = appendDateToForceFetchProfilePicture(
				details.profile_picture
			);
		return details;
	} catch (e) {
		return rejectWithValue(e);
	}
});
