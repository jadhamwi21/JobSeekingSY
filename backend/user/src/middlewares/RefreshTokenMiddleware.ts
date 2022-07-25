import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ErrorNotification } from "../models/ErrorNotification";
import { IJwtRefreshTokenPayload } from "../types/types";

export const RefreshTokenMiddleware: RequestHandler = (req, res, next) => {
	const { refresh_token } = req.cookies;
	if (refresh_token) {
		const { username, role }: IJwtRefreshTokenPayload = jwt.verify(
			refresh_token,
			process.env.PRIVATE_KEY as string
		) as IJwtRefreshTokenPayload;
		req.username = username;
		req.role = role;
		next();
	} else {
		next(Error("token error"));
	}
};
