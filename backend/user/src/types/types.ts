import { RequestHandler, Response } from "express";
import { Document, Model, Types } from "mongoose";
import { string } from "yup";

export type TypedHandler<RequestBodyType = any> = RequestHandler<
	{},
	{ notification: INotification } & { [key: string]: any },
	RequestBodyType
>;

export type Role = "Seeker" | "Recruiter";

export interface ISignupForm {
	first_name: string;
	middle_name?: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	role: Role;
}

export interface INotification {
	message: string;
	description: string;
}

export interface IUser {
	username: string;
	email: string;
	password: string;
	role: Role;
}

export interface IUserModel extends Model<IUser> {
	findUserByEmail: (
		this: Model<IUser, any, any, any>,
		email: string
	) => Promise<IUser>;
	findUserByUsername: (
		this: Model<IUser, any, any, any>,
		username: string
	) => Promise<IUser>;
}

export interface ILoginForm {
	username_email: string;
	password: string;
}

export type PairOfTokensType = [string, string];

export type UserInstanceType =
	| (Document<unknown, any, IUser> &
			IUser & {
				_id: Types.ObjectId;
			})
	| null;

export interface INewProfile {
	first_name: string;
	middle_name?: string;
	last_name: string;
}

export interface IJwtRefreshTokenPayload {
	username: string;
	role: Role;
}
