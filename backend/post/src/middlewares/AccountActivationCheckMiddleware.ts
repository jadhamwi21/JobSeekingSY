import parseBearerToken from "parse-bearer-token";
import jwt from "jsonwebtoken";
import { ErrorNotification } from "../models/ErrorNotification";
import { RequestHandler } from "express";
import { TypedHandler } from "../ts/types/app.types";
import { IJwtPayload } from "../ts/interfaces/middlewares.interfaces";

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
