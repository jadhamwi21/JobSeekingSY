import axios from "axios";
import {
	setAccessToken,
	setAccountActivated,
	setAuthenticated,
	setProfileSetup,
	setRole,
} from "../redux/slices/UserSlice/userSlice";
import { store } from "../redux/store/store";
import { setMenuSelectedItemThunk } from "../redux/thunks/menuThunk";
import { IUserLoginResponse, Role } from "../types/types";

export const userLogin = async (
	username_email: string,
	password: string
): Promise<IUserLoginResponse> => {
	return axios
		.post<IUserLoginResponse>(
			"/user/login",
			{
				username_email,
				password,
			},
			{ withCredentials: true }
		)
		.then(({ data }) => {
			return data;
		})
		.catch((err) => {
			throw new Error(err);
		});
};
export interface ISignupFormFields {
	first_name: string;
	middle_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	confirm_password: string;
	role: Role;
}

export const userSignup = async (
	formFields: ISignupFormFields
): Promise<boolean> => {
	return axios.post("/user/signup", { ...formFields });
};

export const userLogout = async () => {
	return axios.post("/user/logout", {}, { withCredentials: true });
};

export const userRefreshToken = async (): Promise<void> => {
	try {
		return await axios
			.get<{
				role: Role;
				access_token: string;
				isProfileSetup: boolean;
				isAccountActivated: boolean;
			}>("/user/refresh", { withCredentials: true })
			.then(({ data }) => data)
			.then(({ role, access_token, isProfileSetup, isAccountActivated }) => {
				const Dispatch = store.dispatch;
				Dispatch(setAccessToken(access_token));
				Dispatch(setRole(role));
				if (role === "Recruiter") {
					Dispatch(setMenuSelectedItemThunk("My Posts"));
				} else {
					Dispatch(setMenuSelectedItemThunk("Seek"));
				}
				Dispatch(setProfileSetup(isProfileSetup));
				Dispatch(setAccountActivated(isAccountActivated));
			});
	} catch (e) {
		throw e;
	}
};
