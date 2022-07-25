import { ErrorNotification } from "../models/ErrorNotification";
import { Users } from "../models/UserModel";
import { PairOfTokensType, Role } from "../types/types";
import { HashService } from "./HashService";
import { JwtService } from "./JwtService";
import { UserStatusService } from "./UserStatusService";

const loginByUsername = async (
	username: string,
	password: string
): Promise<[PairOfTokensType, Role]> => {
	const user = await Users.findOne({ username });
	if (!user) throw new ErrorNotification("Login", 401, "incorrect username");

	const isPasswordMatch = await HashService.comparePassword(
		password,
		user.password
	);
	if (!isPasswordMatch)
		throw new ErrorNotification("Login", 401, "incorrect password");
	const { isAccountActivated, isProfileSetup } =
		await UserStatusService.getUserStatus(user.username);
	const tokens = JwtService.getPairOfTokens(
		user.username,
		user.role,
		isProfileSetup,
		isAccountActivated
	);
	return [tokens, user.role];
};

const loginByEmail = async (
	email: string,
	password: string
): Promise<[PairOfTokensType, Role]> => {
	const user = await Users.findOne({ email });
	if (!user) throw new ErrorNotification("Login", 401, "incorrect email");

	const isPasswordMatch = await HashService.comparePassword(
		password,
		user.password
	);
	if (!isPasswordMatch)
		throw new ErrorNotification("Login", 401, "incorrect password");
	const { isAccountActivated, isProfileSetup } =
		await UserStatusService.getUserStatus(user.username);
	const tokens = JwtService.getPairOfTokens(
		user.username,
		user.role,
		isProfileSetup,
		isAccountActivated
	);
	return [tokens, user.role];
};

export const LoginService = {
	loginByEmail,
	loginByUsername,
};
