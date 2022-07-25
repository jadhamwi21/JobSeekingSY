import { IRecruiterProfileSetup, TypedHandler } from "../types/types";
import * as yup from "yup";
import { Governorates } from "../constants/governorates";
import { removeEmptyValueTransformer } from "../utils/utils";

const recruiterProfileSetupSchema = yup.object().shape({
	governorate: yup
		.string()
		.oneOf(Governorates)
		.required("Governorate is required"),
	company_name: yup.string().required("Company Name is required"),
	company_description: yup.string().required("Company Description is required"),
	profile_picture: yup.string().transform(removeEmptyValueTransformer),
});

export const RecruiterProfileSetupMiddleware: TypedHandler<
	any,
	IRecruiterProfileSetup
> = async (req, res, next) => {
	try {
		const recruiterProfileSetup = req.body;
		const validatedRecruiterProfileSetup =
			await recruiterProfileSetupSchema.validate(recruiterProfileSetup);
		req.body = validatedRecruiterProfileSetup;
		next();
	} catch (e) {
		next(e);
	}
};
