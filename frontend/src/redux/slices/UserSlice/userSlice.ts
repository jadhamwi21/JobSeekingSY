import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../../types/types";
import {
	userIsAccountActivatedThunk,
	userLoginThunk,
	userLogoutThunk,
	userProfileIsSetupThunk,
} from "../../thunks/userThunks";
import { IUserReducerState } from "./userSlice.types";

const initialState: IUserReducerState = {
	isAuthenticated: false,
	role: "Seeker",
	isAccountActivated: false,
	isProfileSetUp: false,
	accessToken: "",
	initialLoading: true,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuthenticated: (
			state: IUserReducerState,
			{ payload: authenticated }: PayloadAction<boolean>
		) => {
			state.isAuthenticated = authenticated;
		},
		setRole: (
			state: IUserReducerState,
			{ payload: role }: PayloadAction<Role>
		) => {
			state.role = role;
		},
		setAccountActivated: (
			state: IUserReducerState,
			{ payload: isActivated }: PayloadAction<boolean>
		) => {
			state.isAccountActivated = isActivated;
		},
		setProfileSetup: (
			state: IUserReducerState,
			{ payload: isProfileSetup }: PayloadAction<boolean>
		) => {
			state.isProfileSetUp = isProfileSetup;
		},
		setAccessToken: (
			state: IUserReducerState,
			{ payload: accessToken }: PayloadAction<string>
		) => {
			state.accessToken = accessToken;
		},
		setInitialLoading: (
			state: IUserReducerState,
			{ payload: initialLoading }: PayloadAction<boolean>
		) => {
			state.initialLoading = initialLoading;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLoginThunk.fulfilled, (state, { payload }) => {
				const { role, access_token } = payload;
				state.isAccountActivated = true;
				state.isAuthenticated = true;
				state.isProfileSetUp = false;
				state.accessToken = access_token;
				state.role = role;
			})
			.addCase(userLoginThunk.rejected, (state) => {
				state.isProfileSetUp = false;
				state.isAuthenticated = false;
				state.isAccountActivated = false;
				state.accessToken = "";
				state.role = null;
			});
		builder.addCase(userLogoutThunk.fulfilled, (state) => {
			state.isAccountActivated = false;
			state.isAuthenticated = false;
			state.isProfileSetUp = false;
			state.role = null;
			state.accessToken = "";
			state.initialLoading = true;
		});
		builder.addCase(
			userProfileIsSetupThunk.fulfilled,
			(state, { payload: isSetup }: PayloadAction<boolean>) => {
				state.isProfileSetUp = isSetup;
			}
		);
		builder.addCase(
			userIsAccountActivatedThunk.fulfilled,
			(state, { payload: isAccountActivated }: PayloadAction<boolean>) => {
				state.isAccountActivated = isAccountActivated;
			}
		);
	},
});

export const {
	setAuthenticated,
	setRole,
	setAccountActivated,
	setProfileSetup,
	setInitialLoading,
	setAccessToken,
} = userSlice.actions;

export const UserReducer = userSlice.reducer;
