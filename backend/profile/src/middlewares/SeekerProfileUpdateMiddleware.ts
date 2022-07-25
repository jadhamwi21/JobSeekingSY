import { SeekerProfileUpdateBody, TypedHandler } from "../types/types";

import * as yup from "yup";
import { Governorates } from "../constants/governorates";
import { removeEmptyValueTransformer } from "../utils/utils";

const seekerProfileUpdateSchema = yup.object().shape({
	first_name: yup.string().required("First Name is required"),
	middle_name: yup.string(),
	last_name: yup.string().required("Last Name is required"),
	profession: yup.string().required("Profession is required"),
	bio: yup.string().transform(removeEmptyValueTransformer),
	profile_picture: yup.string().transform(removeEmptyValueTransformer),
	governorate: yup
		.string()
		.oneOf(Governorates)
		.required("Governorate is required"),
	resume: yup.string().transform(removeEmptyValueTransformer),
});

export const SeekerProfileUpdateMiddleware: TypedHandler<
	SeekerProfileUpdateBody
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
