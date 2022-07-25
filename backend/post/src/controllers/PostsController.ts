import { RequestHandler } from "express";
import { ErrorNotification } from "../models/ErrorNotification";
import { Posts } from "../models/PostModel";
import { ILatestPostsQuery } from "../ts/interfaces/controllers.interfaces";
import { TypedHandler } from "../ts/types/app.types";

const getPosts: TypedHandler<any, any, ILatestPostsQuery> = async (
	req,
	res,
	next
) => {
	const { query, governorate, remote, page: _page, limit: _limit } = req.query;
	const page = parseInt(_page);
	const limit = parseInt(_limit);
	try {
		let posts;
		let totalPosts;

		if (query || governorate || remote) {
			console.log(query, governorate, remote);

			[posts, totalPosts] = await Posts.getPostsBySearchQuery(
				{
					page,
					limit,
				},
				query,
				governorate,
				remote
			);
		} else {
			[posts, totalPosts] = await Posts.getLatestPosts({ page, limit });
		}
		return res.status(200).send({ posts, totalPosts });
	} catch (e) {
		next(e);
	}
};

const getRecruiterPosts: RequestHandler = async (req, res, next) => {
	const username = req.username!;
	try {
		const posts = await Posts.getRecruiterPosts(username);
		return res.status(200).send({ posts });
	} catch (e) {
		return next(e);
	}
};

const getCompanyPosts: TypedHandler<any, { company_name: string }> = async (
	req,
	res,
	next
) => {
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
	const posts = await Posts.getCompanyPosts(company_name);
	return res.status(200).send({ posts });
};

export const PostsController = {
	getPosts,
	getRecruiterPosts,
	getCompanyPosts,
};
