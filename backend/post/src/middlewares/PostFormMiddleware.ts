import { RequestHandler } from "express";
import * as yup from "yup";
import { UrlRegex } from "../constants/constants";
import { ErrorNotification } from "../models/ErrorNotification";
import { TypedHandler } from "../ts/types/app.types";

const postSchema = yup.object().shape({
	title: yup.string().required("Title is required"),
	company_name: yup.string().required("Company Name is required"),
	remote: yup.string().required("Remote is required"),
	salary: yup.string().required("Salary is required"),
	governorate: yup.string().required("Governorate is required"),
	type: yup.string().required("Type is required"),
	status: yup.string().required("Status is required"),
	description: yup.string().required("Description is required"),
	application_link: yup
		.string()
		.matches(UrlRegex, "Invalid Application URL")
		.required("Application Link is required"),
});

export const PostFormMiddleware: RequestHandler = async (req, res, next) => {
	try {
		const post = req.body;
		await postSchema.validate(post);
		return next();
	} catch (e) {
		return next(e);
	}
};
