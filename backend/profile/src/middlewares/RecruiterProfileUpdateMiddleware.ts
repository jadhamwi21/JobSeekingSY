import {
	RecruiterProfileUpdateBody,
	SeekerProfileUpdateBody,
	TypedHandler,
} from "../types/types";

import * as yup from "yup";
import { Governorates } from "../constants/governorates";
import { removeEmptyValueTransformer } from "../utils/utils";

const seekerProfileUpdateSchema = yup.object().shape({
	first_name: yup.string().required("First Name is required"),
	middle_name: yup.string().transform(removeEmptyValueTransformer),
	last_name: yup.string().required("Last Name is required"),
	company_name: yup.string().required("Company Name is required"),
	company_description: yup.string().required("Company Description is required"),
	profile_picture: yup.string().transform(removeEmptyValueTransformer),
	governorate: yup
		.string()
		.oneOf(Governorates)
		.required("Governorate is required"),
});

export const RecruiterProfileUpdateMiddleware: TypedHandler<
	RecruiterProfileUpdateBody
> = async (req, res, next) => {
	try {
		const seekerProfile = req.body;
		const validatedProfileSetup = await seekerProfileUpdateSchema.validate(
			seekerProfile
		);
		req.body = validatedProfileSetup;
		return next();
	} catch (e) {
		next(e);
	}
};
