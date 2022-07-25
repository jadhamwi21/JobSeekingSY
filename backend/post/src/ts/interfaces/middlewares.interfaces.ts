import { Role } from "../types/app.types";

export interface IJwtPayload {
	username: string;
	role: Role;
	isAccountActivated: boolean;
	isProfileSetup: boolean;
}
