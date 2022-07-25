import { ErrorNotification } from "../models/ErrorNotification";
import { Posts } from "../models/PostModel";
import { IPost } from "../ts/interfaces/controllers.interfaces";
import { TypedHandler } from "../ts/types/app.types";

const createNewPost: TypedHandler<IPost> = async (req, res, next) => {
	const post = req.body;
	const username = req.username!;
	try {
		await Posts.newPost(post, username);
		return res
			.status(200)
			.send({ notification: { message: "Post", description: "Post created" } });
	} catch (e) {
		console.log(e);
		next(e);
	}
};

const updatePost: TypedHandler<IPost, { postId: string }> = async (
	req,
	res,
	next
) => {
	const { postId } = req.params;
	const post = req.body;
	try {
		if (!postId) {
			throw new ErrorNotification("Post Edit", 400, "Post ID is missing");
		}
		const targetPost = await Posts.findOne({ id: postId });
		if (targetPost?.company_name !== post.company_name) {
			throw new ErrorNotification(
				"Post Edit",
				403,
				"Unauthroized to edit this post"
			);
		}
		if (targetPost) {
			targetPost.updatePost(post);
			return res.status(200).send({
				notification: {
					message: "Post Edit",
					description: "Post updated successfully",
				},
			});
		} else {
			throw new ErrorNotification(
				"Post Edit",
				404,
				"Post with this id was not found"
			);
		}
	} catch (e) {
		next(e);
	}
};

const deletePost: TypedHandler<
	{ company_name: string },
	{ postId: string }
> = async (req, res, next) => {
	const { postId } = req.params;
	const { company_name } = req.body;
	try {
		if (!postId) {
			throw new ErrorNotification("Post Delete", 400, "Post ID is missing");
		}
		if (!company_name) {
			throw new ErrorNotification(
				"Post Delete",
				400,
				"Company Name is missing"
			);
		}
		const targetPost = await Posts.findOne({ id: postId });
		if (targetPost?.company_name !== company_name) {
			throw new ErrorNotification(
				"Profile Delete",
				403,
				"Unauthroized to delete this post"
			);
		}

		console.log(company_name, targetPost.company_name, postId);
		if (targetPost) {
			await targetPost.delete();
			return res.status(200).send({
				notification: {
					message: "Post Deletion",
					description: "Post deleted successfully",
				},
			});
		} else {
			throw new ErrorNotification(
				"Post Delete",
				404,
				"Post with this id was not found"
			);
		}
	} catch (e) {
		next(e);
	}
};

export const PostController = {
	createNewPost,
	updatePost,
	deletePost,
};
