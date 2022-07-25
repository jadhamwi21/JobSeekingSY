import { Companies } from "../models/CompanyProfileModel";
import { ErrorNotification } from "../models/ErrorNotification";
import { CompanyService } from "../services/CompanyService";
import { ProfileService } from "../services/ProfileService";
import { TypedHandler } from "../types/types";

const getProfileDetails: TypedHandler<{ username: string } | void> = async (
	req,
	res
) => {
	const { username: paramUsername } = req.params;
	const tokenUsername = req.username;
	const profile = await ProfileService.findProfile(
		paramUsername ?? tokenUsername,
		{ withSetup: false, recruiter: true, seeker: true }
	);

	if (profile) {
		if ("company_name" in profile) {
			const company = await Companies.findOne({ name: profile.company_name });

			return res.status(200).send({
				details: {
					...profile,
					company_description: company?.description,
					governorate: company?.governorate,
				},
			});
		}

		return res.status(200).send({ details: profile });
	}

	return res.status(404).send({
		notification: { message: "Profile", description: "Profile not found" },
	});
};

const getCompanyProfileDetails: TypedHandler<
	any,
	{ company_name: string }
> = async (req, res, next) => {
	const { company_name } = req.params;
	if (!company_name) {
		return next(
			new ErrorNotification(
				"Posts",
				400,
				"company name must be passed as parameter"
			)
		);
	}
	const company = await CompanyService.findCompanyByName(company_name);

	if (company) {
		return res.status(200).send({ companyProfile: company });
	} else {
		next(
			new ErrorNotification(
				"Profile",
				404,
				"Company with this name was not found"
			)
		);
	}
};

const searchSeekerProfile: TypedHandler<any, { username: string }> = async (
	req,
	res,
	next
) => {
	console.log("in");
	const { username } = req.params;
	const profiles = await ProfileService.searchForSeeker(username);

	if (profiles?.length !== 0) {
		return res.status(200).send({ searchResults: profiles });
	} else {
		return res.status(404).end();
	}
};

export const ProfileController = {
	getProfileDetails,
	getCompanyProfileDetails,
	searchSeekerProfile,
};
