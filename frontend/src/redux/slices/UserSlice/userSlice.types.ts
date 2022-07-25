import { Role } from "../../../types/types";

export interface IUserReducerState {
	isAuthenticated: boolean;
	role: Role;
	isAccountActivated: boolean;
	isProfileSetUp: boolean;
	accessToken: string;
	initialLoading: boolean;
}
