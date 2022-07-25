import parseBearerToken from "parse-bearer-token";
import { IJwtPayload, TypedHandler } from "../types/types";
import jwt from "jsonwebtoken";
import { ErrorNotification } from "../models/ErrorNotification";
import { RequestHandler } from "express";

export const ProfileSetupCheckMiddleware: TypedHandler<any, any> = (
	req,
	res,
	next
) => {
	const access_token = parseBearerToken(req);
	if (access_token) {
		const { isProfileSetup }: IJwtPayload = jwt.verify(
			access_token,
			process.env.PRIVATE_KEY as string
		) as IJwtPayload;
		if (isProfileSetup) {
			next();
		} else {
			next(new ErrorNotification("Unauthorized", 403, "Profile is not setup"));
		}
	} else {
		next(new ErrorNotification("Error", 403, "Invalid Credentials"));
	}
};
