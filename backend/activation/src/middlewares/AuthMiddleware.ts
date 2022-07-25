import parseBearerToken from "parse-bearer-token";
import jwt from "jsonwebtoken";
import { IJwtPayload } from "../ts/interfaces/middlewares.interfaces";
import { ErrorNotification } from "../models/ErrorNotification";
import { TypedHandler } from "../ts/types/app.types";

export const AuthMiddleware: TypedHandler<any, { access_token: string }> = (
	req,
	res,
	next
) => {
	const access_token = parseBearerToken(req);
	if (access_token) {
		const { username, role }: IJwtPayload = jwt.verify(
			access_token,
			process.env.PRIVATE_KEY as string
		) as IJwtPayload;
		if (username && role) {
			req.username = username;
			req.role = role;
			return next();
		} else {
			return next(new ErrorNotification("Error", 403, "Invalid Credentials"));
		}
	} else {
		return next(new ErrorNotification("Error", 403, "Invalid Credentials"));
	}
};
