import { AppState } from "../store/store";

export const selectIsAuthenticated = (state: AppState) =>
	state.User.isAuthenticated;
export const selectRole = (state: AppState) => state.User.role;
export const selectIsAccountActivated = (state: AppState) =>
	state.User.isAccountActivated;

export const selectIsProfileSetup = (state: AppState) =>
	state.User.isProfileSetUp;

export const selectAccessToken = (state: AppState) => state.User.accessToken;

export const selectInitialLoading = (state: AppState) =>
	state.User.initialLoading;

export const selectUserState = (state: AppState) => state.User;
