import { Governorate } from "../constants/governorates";
import { Profession } from "../constants/professions";
import { IFullname } from "../redux/slices/ProfileSlice/profileSlice.types";

export interface IAxiosInterceptorResponseData {
	message: string;
	description: string;
}

export type Role = "Seeker" | "Recruiter" | null;

export type SalaryType =
	| string
	| {
			lowerBound: string;
			upperBound: string;
	  };
type JobStatus = "Open" | "Closed";

type JobType = "Full-Time" | "Part-Time";

export interface IPost {
	id: string;
	title: string;
	type: JobType;
	governorate: Governorate;
	remote: boolean;
	salary: SalaryType;
	status: JobStatus;
	description: string;
	application_link: string;
	company_name: string;
	posted_by?: string;
}

export interface IUserLoginResponse {
	role: Role;
	access_token: string;
}

export interface IGetProfileDetailsResponse {
	first_name?: string;
	governorate: Governorate;
	last_name?: string;
	middle_name?: string;
	profile_picture?: string;
	profession?: Profession;
	company_name?: string;
	company_description?: string;
	bio?: string;
	resume?: string;
}

export interface IJobSearchResponse {
	posts: IPost[];
	totalPosts: number;
}

export interface IMyPostsResponse {
	posts: IPost[];
}

export interface ICompany {
	name: string;
	governorate: Governorate;
	description: string;
}

export interface IRecruiter {
	first_name: string;
	middle_name?: string;
	last_name: string;
	profile_picture?: string;
}
