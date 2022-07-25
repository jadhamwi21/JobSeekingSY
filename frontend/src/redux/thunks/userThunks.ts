import { createAsyncThunk } from "@reduxjs/toolkit";
import { accountActivation, getAccountActivation } from "../../api/account";
import { getProfileIsSetup } from "../../api/profile";
import { userLogin, userLogout } from "../../api/user";
import { CellsType } from "../../context/AccountActivationContext/AccountActivationContext";
import { IUserLoginResponse } from "../../types/types";
import { resetCompanySlice } from "../slices/CompanySlice/companySlice";
import { resetJobSlice } from "../slices/JobSearchSlice/jobSearchSlice";
import { startLoggingOut } from "../slices/LogoutSlice/logoutSlice";
import { resetMenuSlice } from "../slices/MenuSlice/menuSlice";
import { resetPostSlice } from "../slices/PostSlice/postSlice";
import { resetProfileSlice } from "../slices/ProfileSlice/profileSlice";
import { AppState } from "../store/store";
import { setMenuSelectedItemThunk } from "./menuThunk";

export const userLoginThunk = createAsyncThunk<
	IUserLoginResponse,
	{ username_email: string; password: string },
	{ state: AppState; rejectWithValue: unknown }
>(
	"user/login",
	async ({ username_email, password }, { rejectWithValue, dispatch }) => {
		try {
			const { role, access_token } = await userLogin(username_email, password);

			if (role === "Seeker") {
				dispatch(setMenuSelectedItemThunk("Seek"));
			} else {
				dispatch(setMenuSelectedItemThunk("My Posts"));
			}

			return { role, access_token };
		} catch (e) {
			return rejectWithValue(e);
		}
	}
);

export const userProfileIsSetupThunk = createAsyncThunk<
	boolean,
	void,
	{ state: AppState; rejectWithValue: unknown }
>("user/profile/setup", async (_, { rejectWithValue }) => {
	try {
		const { profileIsSetup } = await getProfileIsSetup();
		return profileIsSetup;
	} catch (e) {
		return rejectWithValue(e);
	}
});
export const userIsAccountActivatedThunk = createAsyncThunk<
	boolean,
	void,
	{ state: AppState; rejectWithValue: unknown }
>("user/account/activation", async (_, { rejectWithValue }) => {
	try {
		const { isActivated } = await getAccountActivation();
		return isActivated;
	} catch (e) {
		return rejectWithValue(e);
	}
});

export const userLogoutThunk = createAsyncThunk<
	void,
	void,
	{ state: AppState; rejectWithValue: unknown }
>("user/logout", async (_, { dispatch }) => {
	dispatch(startLoggingOut());
	await userLogout();
	dispatch(resetJobSlice());
	dispatch(resetMenuSlice());
	dispatch(resetPostSlice());
	dispatch(resetProfileSlice());
	dispatch(resetCompanySlice());
});
