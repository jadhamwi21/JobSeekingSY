import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import isEmail from "validator/lib/isEmail";
import { ErrorNotification } from "../models/ErrorNotification";
import { Users } from "../models/UserModel";
import { produceNewProfile } from "../mq/NewProfile.producer";
import { produceNewUnactivatedAccount } from "../mq/NewUnactivatedAccounts.producer";
import { JwtService } from "../services/JwtService";
import { LoginService } from "../services/LoginService";
import { emailInUse, usernameExists } from "../services/SignupService";
import { UserStatusService } from "../services/UserStatusService";
import {
	ILoginForm,
	ISignupForm,
	PairOfTokensType,
	Role,
	TypedHandler,
} from "../types/types";

export const signup: TypedHandler<ISignupForm> = async (req, res, next) => {
	const { username, email, password, role } = req.body;
	try {
		const username_exist = await usernameExists(username);
		const email_exist = await emailInUse(email);
		if (username_exist) {
			throw new ErrorNotification(
				"Signup",
				StatusCodes.CONFLICT,
				"username is already taken"
			);
		}
		if (email_exist) {
			throw new ErrorNotification(
				"Signup",
				StatusCodes.CONFLICT,
				"email is already in use"
			);
		}
		await Users.create({ username, email, password, role });
		const { first_name, last_name, middle_name } = req.body;
		produceNewProfile({ first_name, last_name, middle_name }, username, role);
		produceNewUnactivatedAccount(username, email);
		return res.status(StatusCodes.OK).send({
			notification: {
				message: "Signup",
				description: "signed up successfully",
			},
		});
	} catch (_e) {
		const e: Error = _e;
		next(e);
	}
};

export const login: TypedHandler<ILoginForm> = async (req, res, next) => {
	const { username_email, password } = req.body;
	let tokens: PairOfTokensType;
	let role: Role;
	try {
		if (isEmail(username_email)) {
			const email = username_email;
			[tokens, role] = await LoginService.loginByEmail(email, password);
		} else {
			const username = username_email;
			[tokens, role] = await LoginService.loginByUsername(username, password);
		}
		const [accessToken, refreshToken] = tokens;
		return res
			.status(200)
			.cookie("refresh_token", refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			})
			.send({
				notification: {
					message: "Login",
					description: "logged in successfully",
				},
				access_token: accessToken,
				role,
			});
	} catch (_e) {
		const e: Error = _e;
		next(e);
	}
};

export const logout: TypedHandler<any> = async (req, res) => {
	return res
		.status(200)
		.clearCookie("refresh_token")
		.send({
			notification: {
				message: "Logout",
				description: "logged out successfully",
			},
		});
};

export const refresh: RequestHandler = async (req, res, next) => {
	const { username, role } = req;
	const { isAccountActivated, isProfileSetup } =
		await UserStatusService.getUserStatus(username!);
	const [access_token, refresh_token] = JwtService.getPairOfTokens(
		username!,
		role!,
		isProfileSetup,
		isAccountActivated
	);

	return res
		.status(200)
		.cookie("refresh_token", refresh_token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		})
		.send({ access_token, role, isAccountActivated, isProfileSetup });
};

export const UserController = {
	signup,
	logout,
	login,
	refresh,
};
