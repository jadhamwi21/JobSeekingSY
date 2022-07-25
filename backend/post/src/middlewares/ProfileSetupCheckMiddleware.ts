import jwt from "jsonwebtoken";
import parseBearerToken from "parse-bearer-token";
import { ErrorNotification } from "../models/ErrorNotification";
import { IJwtPayload } from "../ts/interfaces/middlewares.interfaces";
import { TypedHandler } from "../ts/types/app.types";

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
