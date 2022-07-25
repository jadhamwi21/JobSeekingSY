import { ErrorNotification } from "../models/ErrorNotification";
import { TypedHandler } from "../ts/types/app.types";

export const RecruiterAuthMiddleware: TypedHandler = (req, res, next) => {
	if (req.role === "Recruiter") {
		return next();
	} else {
		next(
			new ErrorNotification(
				"Unauthorized",
				403,
				"you're not allowed to access this resource"
			)
		);
	}
};
