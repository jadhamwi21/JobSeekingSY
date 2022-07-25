import {
	ISeekerProfile,
	ISeekerProfileSetup,
	TypedHandler,
} from "../types/types";

import * as yup from "yup";
import { Governorates } from "../constants/governorates";
import { removeEmptyValueTransformer } from "../utils/utils";

const seekerProfileSetupSchema = yup.object().shape({
	profession: yup.string().required("Profession is required"),
	bio: yup.string().transform(removeEmptyValueTransformer),
	profile_picture: yup.string().transform(removeEmptyValueTransformer),
	governorate: yup
		.string()
		.oneOf(Governorates)
		.required("Governorate is required"),
	resume: yup.string().transform(removeEmptyValueTransformer),
});

export const SeekerProfileSetupMiddleware: TypedHandler<
	any,
	ISeekerProfileSetup
> = async (req, res, next) => {
	try {
		const seekerProfile = req.body;
		const validatedProfileSetup = await seekerProfileSetupSchema.validate(
			seekerProfile
		);
		req.body = validatedProfileSetup;
		return next();
	} catch (e) {
		next(e);
	}
};
