import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorNotification } from "../models/ErrorNotification";

export const ErrorMiddleware: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err);
	if (err instanceof ErrorNotification) {
		return res.status(err.status).send({
			notification: {
				message: err.message,
				description: err.description,
			},
		});
	} else {
		console.log(err);
		return res.status(500).send(err.message);
	}
};
