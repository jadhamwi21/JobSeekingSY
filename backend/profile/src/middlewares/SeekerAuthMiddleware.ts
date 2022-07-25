import { ErrorNotification } from "../models/ErrorNotification";
import { TypedHandler } from "../types/types";

export const SeekerAuthMiddleware: TypedHandler = (req, res, next) => {
	if (req.role === "Seeker") {
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
