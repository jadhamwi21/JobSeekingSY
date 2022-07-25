import { RequestHandler } from "express";
import { IPost } from "../interfaces/controllers.interfaces";
import { INotification } from "../interfaces/global.interfaces";

export type Role = "Seeker" | "Recruiter";

export type TypedHandler<
	RequestBodyType = any,
	ParamsType = any,
	QueryType = any
> = RequestHandler<
	ParamsType,
	{ notification?: INotification } & { [key: string]: any },
	RequestBodyType,
	QueryType
>;

export type PostType = "Full-Time" | "Part-Time";
export type PostStatus = "Open" | "Closed";

export type RemoteType = "yes" | "no";

export type SavedPostType = IPost & { id: string };
