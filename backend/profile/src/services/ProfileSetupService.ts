import { ErrorNotification } from "../models/ErrorNotification";
import { RecruitersProfiles } from "../models/RecruiterProfileModel";
import { SeekersProfiles } from "../models/SeekerProfileModel";
import {
	IRecruiterProfileSetup,
	ISeekerProfileSetup,
	Role,
} from "../types/types";
import {
	getProfilePictureNameByUsername,
	getResumeNameByUsername,
} from "../utils/utils";
import { ProfilePictureService } from "./ProfilePictureService";
import { ResumeService } from "./ResumeService";

const getProfileIsSetup = async (username: string, role: Role) => {
	try {
		if (role === "Seeker") {
			const seeker = await SeekersProfiles.findOne(
				{ username },
				{},
				{ lean: true }
			);
			if (seeker) {
				return seeker.isSetup;
			}
		}
		if (role === "Recruiter") {
			const recruiter = await RecruitersProfiles.findOne(
				{ username },
				{},
				{ lean: true }
			);
			if (recruiter) {
				return recruiter.isSetup;
			}
		}
		return false;
	} catch (e) {
		throw e;
	}
};

const seekerProfileSetup = async (
	username: string,
	profile: ISeekerProfileSetup
) => {
	try {
		if (profile.profile_picture) {
			ProfilePictureService.saveNewProfilePicture(
				username,
				profile.profile_picture
			);
			profile.profile_picture = `/images/${getProfilePictureNameByUsername(
				username
			)}`;
		}

		if (profile.resume) {
			ResumeService.saveNewResume(username, profile.resume);
			profile.resume = `/resumes/${getResumeNameByUsername(username)}`;
		}
		await SeekersProfiles.updateOne(
			{ username },
			{ ...profile, isSetup: true }
		);
	} catch (e) {
		throw new ErrorNotification(
			"Profile Setup",
			500,
			"Something went wrong, try again later"
		);
	}
};

const recruiterProfileSetup = async (
	username: string,
	profile: Omit<IRecruiterProfileSetup, "company_description">
) => {
	try {
		if (profile.profile_picture) {
			ProfilePictureService.saveNewProfilePicture(
				username,
				profile.profile_picture
			);
			profile.profile_picture = `/images/${getProfilePictureNameByUsername(
				username
			)}`;
		}
		await RecruitersProfiles.updateOne(
			{ username },
			{ ...profile, isSetup: true }
		);
	} catch (e) {
		throw new ErrorNotification(
			"Profile Setup",
			500,
			"Something went wrong, try again later"
		);
	}
};

export const ProfileSetupService = {
	getProfileIsSetup,
	seekerProfileSetup,
	recruiterProfileSetup,
};
