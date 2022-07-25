import { RequestHandler } from "express";
import { INotification } from "../interfaces/global.interfaces";

export type Role = "Seeker" | "Recruiter";

export type TypedHandler<
	RequestBodyType = any,
	ParamsType = any
> = RequestHandler<
	ParamsType,
	{ notification?: INotification } & { [key: string]: any },
	RequestBodyType
>;
