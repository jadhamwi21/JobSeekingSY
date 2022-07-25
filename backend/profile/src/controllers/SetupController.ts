import { ErrorNotification } from "../models/ErrorNotification";
import { CompanyService } from "../services/CompanyService";
import { ProfileSetupService } from "../services/ProfileSetupService";
import {
	IRecruiterProfileSetup,
	ISeekerProfile,
	ISeekerProfileSetup,
	TypedHandler,
} from "../types/types";

const getProfileIsSetup: TypedHandler = async (req, res) => {
	const { username, role } = req;
	const profileIsSetup = await ProfileSetupService.getProfileIsSetup(
		username!,
		role!
	);
	return res.status(200).send({
		profileIsSetup,
	});
};

const seekerProfileSetup: TypedHandler<ISeekerProfileSetup> = async (
	req,
	res,
	next
) => {
	const seekerProfile = req.body;
	const { username } = req;
	try {
		await ProfileSetupService.seekerProfileSetup(username!, seekerProfile);
		return res.status(200).send({
			notification: {
				message: "Profile Setup",
				description: "Your profile is setup successfully",
			},
		});
	} catch (e) {
		next(e);
	}
};

const recruiterProfileSetup: TypedHandler<IRecruiterProfileSetup> = async (
	req,
	res,
	next
) => {
	const recruiterProfile = req.body;
	const { username } = req;
	try {
		const company = await CompanyService.findCompanyByName(
			recruiterProfile.company_name
		);
		if (!company) {
			const { company_name, company_description, governorate } =
				recruiterProfile;
			await CompanyService.addNewCompany(
				company_name,
				company_description,
				governorate
			);
		} else {
			throw new ErrorNotification(
				"Company Name",
				409,
				"Company with same name already exists"
			);
		}
		await ProfileSetupService.recruiterProfileSetup(
			username!,
			recruiterProfile
		);
		return res.status(200).send({
			notification: {
				message: "Profile Setup",
				description: "Your profile is setup successfully",
			},
		});
	} catch (e) {
		next(e);
	}
};

export const SetupController = {
	getProfileIsSetup,
	seekerProfileSetup,
	recruiterProfileSetup,
};
