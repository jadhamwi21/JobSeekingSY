import { PostStatus, PostType, RemoteType } from "../types/app.types";

export interface IPost {
	title: string;
	type: PostType;
	governorate: string;
	remote: boolean;
	salary: string;
	status: PostStatus;
	description: string;
	application_link: string;
	company_name: string;
}

export interface ILatestPostsQuery {
	page: string;
	limit: string;
	governorate: string;
	query: string;
	remote: RemoteType;
}
