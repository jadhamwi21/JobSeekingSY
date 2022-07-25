import { ILoginForm, TypedHandler } from "../types/types";

import * as yup from "yup";
import { ErrorNotification } from "../models/ErrorNotification";

const loginSchema = yup.object().shape({
	username_email: yup.string().required("username or email is required"),
	password: yup.string().required("password is required"),
});

export const LoginMiddleware: TypedHandler<ILoginForm> = async (
	req,
	res,
	next
) => {
	try {
		const loginForm = req.body;
		await loginSchema.validate(loginForm);
		next();
	} catch (_e) {
		const e: Error = _e;
		next(new ErrorNotification("Login", 400, e.message));
	}
};
