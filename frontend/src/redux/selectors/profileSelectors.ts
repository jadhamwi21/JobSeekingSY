import { AppState } from "../store/store";

export const selectUserFullName = (state: AppState) => state.Profile.fullName;
export const selectUserProfilePicture = (state: AppState) =>
	state.Profile.profile_picture;
export const selectUserProfileLoading = (state: AppState) =>
	state.Profile.loading;

export const selectUserProfileState = (state: AppState) => state.Profile;
