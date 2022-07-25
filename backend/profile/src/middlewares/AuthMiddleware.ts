import { RequestHandler } from "express";
import { IJwtPayload, TypedHandler } from "../types/types";
import jwt from "jsonwebtoken";
import parseBearerToken from "parse-bearer-token";
import { ErrorNotification } from "../models/ErrorNotification";

export const AuthMiddleware: RequestHandler = (req, res, next) => {
	const access_token = parseBearerToken(req);
	if (access_token) {
		const { username, role }: IJwtPayload = jwt.verify(
			access_token,
			process.env.PRIVATE_KEY as string
		) as IJwtPayload;
		req.username = username;
		req.role = role;
		return next();
	} else {
		return next(new ErrorNotification("Error", 403, "Invalid Credentials"));
	}
};
