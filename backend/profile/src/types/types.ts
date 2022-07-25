import { RequestHandler } from "express";

export type TypedHandler<
	RequestBodyType = any,
	ParamsType = any
> = RequestHandler<
	ParamsType,
	{ notification?: INotification } & { [key: string]: any },
	RequestBodyType
>;

export interface INotification {
	message: string;
	description: string;
}

export interface ISeekerProfile {
	username: string;
	first_name: string;
	middle_name?: string;
	last_name: string;
	profile_picture?: string;
	governorate?: string;
	profession?: string;
	bio?: string;
	resume?: string;
	isSetup: boolean;
}

export interface IRecruiterProfile {
	username: string;
	first_name: string;
	middle_name?: string;
	last_name: string;
	profile_picture?: string;
	company_name?: string;
	isSetup: boolean;
}

export interface INewProfile {
	first_name: string;
	middle_name?: string;
	last_name: string;
}

export interface ICompany {
	name: string;
	description: string;
	governorate: string;
}

export type Role = "Seeker" | "Recruiter";

export interface IJwtPayload {
	username: string;
	role: Role;
	isAccountActivated: boolean;
	isProfileSetup: boolean;
}

export interface ISeekerProfileSetup {
	governorate: string;
	profession: string;
	bio?: string;
	resume?: string;
	profile_picture?: string;
}

export interface IRecruiterProfileSetup {
	governorate: string;
	company_name: string;
	company_description: string;
	profile_picture?: string;
}

export type SeekerProfileUpdateBody = Omit<
	ISeekerProfile,
	"username" | "isSetup"
>;

export type RecruiterProfileUpdateBody = Omit<
	IRecruiterProfile,
	"username" | "isSetup"
> & { company_description: string; governorate: string };
