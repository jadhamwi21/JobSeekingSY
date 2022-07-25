import { RequestHandler } from "express";
import { SavedPosts } from "../models/SavedPostModel";
import { SavedPostType, TypedHandler } from "../ts/types/app.types";

const getSeekerSavedPosts: RequestHandler = async (req, res, next) => {
	const username = req.username!;
	try {
		await SavedPosts.assertSeeker(username);
		const savedPosts = await SavedPosts.getSavedPosts(username);
		return res.status(200).send({ savedPosts });
	} catch (e) {
		next(e);
	}
};

const lookupSavedPost: TypedHandler<any, { postId: string }> = async (
	req,
	res,
	next
) => {
	const username = req.username!;
	const { postId } = req.params;
	try {
		await SavedPosts.assertSeeker(username);
		const found = await SavedPosts.lookupSavedPostForSeeker(username, postId);
		return res.status(200).send({ lookup_result: found });
	} catch (e) {
		next(e);
	}
};

const savePost: TypedHandler<{ post: SavedPostType }> = async (
	req,
	res,
	next
) => {
	const username = req.username!;
	const post = req.body.post;
	try {
		SavedPosts.assertSeeker(username);
		const seeker = await SavedPosts.findOne({ username })!;
		await seeker?.savePost(post);
		return res
			.status(200)
			.send({ notification: { message: "Post", description: "Post saved" } });
	} catch (e) {
		next(e);
	}
};

const unsavePost: TypedHandler<any, { postId: string }> = async (
	req,
	res,
	next
) => {
	const username = req.username!;
	const { postId } = req.params;
	try {
		SavedPosts.assertSeeker(username);
		const seeker = await SavedPosts.findOne({ username })!;
		await seeker?.unsavePost(postId);
		return res
			.status(200)
			.send({ notification: { message: "Post", description: "Post unsaved" } });
	} catch (e) {
		next(e);
	}
};

export const SavedController = {
	getSeekerSavedPosts,
	lookupSavedPost,
	unsavePost,
	savePost,
};
