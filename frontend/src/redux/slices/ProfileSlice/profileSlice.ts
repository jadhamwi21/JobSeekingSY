import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Governorate } from "../../../constants/governorates";
import { IGetProfileDetailsResponse } from "../../../types/types";
import { getMyProfileDetailsThunk } from "../../thunks/profileThunks";
import { IFullname, IProfileReducerState } from "./profileSlice.types";

const initialState: IProfileReducerState = {
	fullName: null,
	profile_picture: "",
	governorate: Governorate.Damascus,
	loading: true,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfileLoading: (
			state: IProfileReducerState,
			{ payload: loading }: PayloadAction<boolean>
		) => {
			state.loading = loading;
		},
		resetProfileSlice: () => initialState,
	},
	extraReducers(builder) {
		builder
			.addCase(
				getMyProfileDetailsThunk.fulfilled,
				(
					state,
					{ payload: profileDetails }: PayloadAction<IGetProfileDetailsResponse>
				) => {
					const fullName: IFullname = {
						firstName: profileDetails.first_name!,
						lastName: profileDetails.last_name!,
						middleName: profileDetails.middle_name,
					};
					delete profileDetails.first_name;
					delete profileDetails.last_name;
					delete profileDetails.middle_name;

					return { ...state, ...profileDetails, fullName, loading: false };
				}
			)
			.addCase(getMyProfileDetailsThunk.rejected, (state) => {
				return state;
			});
	},
});

export const { resetProfileSlice, setProfileLoading } = profileSlice.actions;
export const ProfileReducer = profileSlice.reducer;
