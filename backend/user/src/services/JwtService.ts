import { PairOfTokensType, Role } from "../types/types";

import jwt from "jsonwebtoken";

export const getPairOfTokens = (
	username: string,
	role: Role,
	isProfileSetup: boolean,
	isAccountActivated: boolean
): PairOfTokensType => {
	const accessToken = jwt.sign(
		{ username, role, isProfileSetup, isAccountActivated },
		process.env.PRIVATE_KEY as string,
		{
			expiresIn: "1h",
		}
	);
	const refreshToken = jwt.sign(
		{ username, role, isProfileSetup, isAccountActivated },
		process.env.PRIVATE_KEY as string,
		{
			expiresIn: "7d",
		}
	);

	return [accessToken, refreshToken];
};

export const JwtService = {
	getPairOfTokens,
};
