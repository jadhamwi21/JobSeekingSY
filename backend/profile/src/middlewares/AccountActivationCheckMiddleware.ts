import parseBearerToken from "parse-bearer-token";
import { IJwtPayload, TypedHandler } from "../types/types";
import jwt from "jsonwebtoken";
import { ErrorNotification } from "../models/ErrorNotification";
import { RequestHandler } from "express";

export const AccountActivationCheckMiddleware: TypedHandler<any, any> = (
	req,
	res,
	next
) => {
	const access_token = parseBearerToken(req);
	if (access_token) {
		const { isAccountActivated }: IJwtPayload = jwt.verify(
			access_token,
			process.env.PRIVATE_KEY as string
		) as IJwtPayload;
		if (isAccountActivated) {
			next();
		} else {
			next(
				new ErrorNotification("Unauthorized", 403, "Account is not activated")
			);
		}
	} else {
		next(new ErrorNotification("Error", 403, "Invalid Credentials"));
	}
};
