import axios from "axios";
import { ICompany, IGetProfileDetailsResponse } from "../types/types";

export interface IRecruiterProfile {
	company_name: string;
	company_description: string;
	profile_picture: string;
	governorate: string;
}

export interface ISeekerProfile {
	profession: string;
	bio: string;
	profile_picture: string;
	governorate: string;
	resume: string;
}

export const recruiterProfileSetup = async (
	recruiterProfile: IRecruiterProfile
) => {
	return await axios.put("/profile/setup/recruiter", recruiterProfile);
};

export const seekerProfileSetup = async (seekerProfile: ISeekerProfile) => {
	return await axios.put("/profile/setup/seeker", seekerProfile);
};

export const getProfileIsSetup = async (): Promise<{
	profileIsSetup: boolean;
}> => {
	return await axios.get("/profile/setup").then(({ data }) => data);
};

export const getMyProfileDetails = async (): Promise<{
	details: IGetProfileDetailsResponse;
}> => {
	return await axios.get("/profile/details").then(({ data }) => {
		return data;
	});
};

export const getUserProfileDetails = async (
	name: string
): Promise<{ details: IGetProfileDetailsResponse }> => {
	return await axios.get(`/profile/details/user/${name}`).then(({ data }) => {
		return data;
	});
};

export const getCompanyProfile = async (
	company_name: string
): Promise<{ companyProfile: ICompany }> => {
	return await axios
		.get(`/profile/details/company/${company_name}`)
		.then(({ data }) => data);
};

export const updateSeekerProfile = async (details: any) => {
	return await axios.put("/profile/updation/seeker", { ...details });
};
export const updateRecruiterProfile = async (details: any) => {
	return await axios.put("/profile/updation/recruiter", { ...details });
};

export const searchSeekerProfile = async (
	username: string
): Promise<IGetProfileDetailsResponse[]> => {
	return await axios
		.get(`/profile/seeker/search/${username}`)
		.then(({ data }) => {
			return data.searchResults;
		});
};
