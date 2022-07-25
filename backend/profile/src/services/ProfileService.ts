import { Companies } from "../models/CompanyProfileModel";
import { ErrorNotification } from "../models/ErrorNotification";
import { RecruitersProfiles } from "../models/RecruiterProfileModel";
import { SeekersProfiles } from "../models/SeekerProfileModel";
import {
	RecruiterProfileUpdateBody,
	SeekerProfileUpdateBody,
} from "../types/types";
import {
	getProfilePictureNameByUsername,
	getResumeNameByUsername,
} from "../utils/utils";
import { ProfilePictureService } from "./ProfilePictureService";
import { ResumeService } from "./ResumeService";

export const findProfile = async (
	username: string,
	{
		seeker,
		recruiter,
		withSetup,
	}: { seeker: boolean; recruiter: boolean; withSetup: boolean }
) => {
	const withSetupProps = withSetup ? {} : { isSetup: 0 };
	try {
		if (recruiter) {
			const recruiterProfile = await RecruitersProfiles.findOne(
				{ username },
				{ _id: 0, __v: 0, ...withSetupProps },
				{ lean: true }
			);

			if (recruiterProfile) {
				return recruiterProfile;
			}
		}
		if (seeker) {
			const seekerProfile = await SeekersProfiles.findOne(
				{ username },
				{ _id: 0, __v: 0, ...withSetupProps },
				{ lean: true }
			);
			if (seekerProfile) {
				if (seekerProfile.resume) {
					seekerProfile.resume = ResumeService.getResume(
						seekerProfile.username
					);
				}
				return seekerProfile;
			}
		}
		return null;
	} catch (e) {
		throw e;
	}
};

const seekerProfileUpdate = async (
	username: string,
	newProfileDetails: SeekerProfileUpdateBody
) => {
	try {
		if (
			newProfileDetails.profile_picture &&
			newProfileDetails.profile_picture !== "same"
		) {
			ProfilePictureService.saveNewProfilePicture(
				username,
				newProfileDetails.profile_picture
			);

			newProfileDetails.profile_picture = `/images/${getProfilePictureNameByUsername(
				username
			)}`;
		} else if (newProfileDetails.profile_picture === "same") {
			newProfileDetails.profile_picture = `/images/${getProfilePictureNameByUsername(
				username
			)}`;
		}
		if (newProfileDetails.resume) {
			ResumeService.saveNewResume(username, newProfileDetails.resume);
			newProfileDetails.resume = `/resumes/${getResumeNameByUsername(
				username
			)}`;
		}

		await SeekersProfiles.findOneAndReplace(
			{ username },
			{ ...newProfileDetails, username, isSetup: true }
		);
	} catch (e) {
		throw e;
	}
};

const recruiterProfileUpdate = async (
	username: string,
	newProfileDetails: RecruiterProfileUpdateBody
) => {
	try {
		if (
			newProfileDetails.profile_picture &&
			newProfileDetails.profile_picture !== "same"
		) {
			ProfilePictureService.saveNewProfilePicture(
				username,
				newProfileDetails.profile_picture
			);

			newProfileDetails.profile_picture = `/images/${getProfilePictureNameByUsername(
				username
			)}`;
		} else if (newProfileDetails.profile_picture === "same") {
			newProfileDetails.profile_picture = `/images/${getProfilePictureNameByUsername(
				username
			)}`;
		}

		const recruiter = await RecruitersProfiles.findOne({ username }, null, {
			lean: true,
		});

		const company = await Companies.findOne({
			name: newProfileDetails.company_name,
		});

		if (!company) {
			// If Company Doesn't Exist Yet
			await Companies.deleteOne({ name: recruiter?.company_name });
			await Companies.create({
				name: newProfileDetails.company_name,
				description: newProfileDetails.company_description,
				governorate: newProfileDetails?.governorate,
			});
		} else if (newProfileDetails.company_name !== recruiter?.company_name) {
			// If Company Is Taken
			throw new ErrorNotification(
				"Company Name",
				409,
				"Company with same name already exists"
			);
		} else {
			// If Same Company But New Description
			await Companies.updateOne(
				{ name: newProfileDetails.company_name },
				{
					description: newProfileDetails.company_description,
					governorate: newProfileDetails.governorate,
				}
			);
		}

		await RecruitersProfiles.findOneAndReplace(
			{ username },
			{ ...newProfileDetails, username, isSetup: true }
		);
	} catch (e) {
		throw e;
	}
};

const searchForSeeker = async (username: string) => {
	let profiles = await SeekersProfiles.find(
		{
			username: { $regex: new RegExp(username, "i") },
		},
		{},
		{ lean: true }
	);
	if (profiles) {
		profiles = profiles.map((profile) => {
			if (profile.resume) {
				profile.resume = ResumeService.getResume(profile.username);
			}
			return profile;
		});
		return profiles;
	} else {
		return null;
	}
};

export const ProfileService = {
	findProfile,
	seekerProfileUpdate,
	recruiterProfileUpdate,
	searchForSeeker,
};
