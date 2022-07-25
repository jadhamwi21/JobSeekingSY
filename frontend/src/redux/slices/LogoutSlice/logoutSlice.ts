import { createSlice } from "@reduxjs/toolkit";
import { ILogoutReducerState } from "./logoutSlice.types";

const initialState: ILogoutReducerState = {
	loggingOut: false,
};

export const logoutSlice = createSlice({
	initialState,
	name: "menu",
	reducers: {
		startLoggingOut: (state: ILogoutReducerState) => {
			state.loggingOut = true;
		},
		finishedLoggingOut: (state: ILogoutReducerState) => {
			state.loggingOut = false;
		},
	},
});

export const { startLoggingOut, finishedLoggingOut } = logoutSlice.actions;

export const LogoutReducer = logoutSlice.reducer;
