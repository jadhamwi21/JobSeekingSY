import * as yup from "yup";
import { ISignupForm, TypedHandler } from "../types/types";

import { ErrorNotification } from "../models/ErrorNotification";
import { removeEmptyValueTransformer } from "../utils/utils";

const nameTransformer = (value: string) => {
	if (value) return value[0].toUpperCase() + value.substring(1);
	return undefined;
};

const SignupFormSchema = yup.object().shape({
	first_name: yup
		.string()
		.required("first name is required")
		.transform(nameTransformer),
	middle_name: yup
		.string()
		.transform(nameTransformer)
		.transform(removeEmptyValueTransformer),
	last_name: yup
		.string()
		.required("last name Is required")
		.transform(nameTransformer),
	username: yup.string().required("username Is required"),
	email: yup
		.string()
		.required("email is required")
		.email("invalid email")
		.lowercase(),
	password: yup.string().min(8).required("password is required"),
	confirm_password: yup
		.string()
		.is([null, yup.ref("password")], "password unmatch")
		.required("confirm password is required"),
	role: yup
		.mixed()
		.oneOf(["Seeker", "Recruiter"], "role should be seeker or recruiter")
		.required("role is required"),
});

export const SignupMiddleware: TypedHandler<ISignupForm> = async (
	req,
	res,
	next
) => {
	const signupForm = req.body;
	try {
		const validatedSignupForm = await SignupFormSchema.validate(signupForm);
		delete validatedSignupForm.confirm_password;
		req.body = validatedSignupForm;
		return next();
	} catch (_e) {
		const e: Error = _e;
		return next(new ErrorNotification("Signup", 400, e.message));
	}
};
