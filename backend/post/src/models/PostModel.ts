import {
	DocumentType,
	getModelForClass,
	modelOptions,
	prop,
	ReturnModelType,
	Severity,
} from "@typegoose/typegoose";
import { v4 as uuid } from "uuid";
import { IPost } from "../ts/interfaces/controllers.interfaces";
import { IPagination } from "../ts/interfaces/models.interfaces";
import { PostStatus, PostType, RemoteType } from "../ts/types/app.types";
import { capitalizeFirstLetterOfEachWordInString } from "../utils/utils";

@modelOptions({
	schemaOptions: { timestamps: true },
	options: { allowMixed: Severity.ALLOW },
})
class Post {
	@prop({ type: String, required: true })
	public id?: number;

	@prop({
		type: String,
		required: true,
	})
	public title?: string;

	@prop({ type: String, required: true })
	public company_name?: string;

	@prop({ type: String, required: true })
	public governorate?: string;

	@prop({ type: Boolean, required: true })
	public remote?: boolean;

	@prop({ type: String, required: true })
	public type?: PostType;

	@prop({ type: String, required: true })
	public status?: PostStatus;

	@prop({ type: String, required: true })
	public salary?: String;

	@prop({ type: String, required: true })
	public description?: string;

	@prop({ type: String, required: true })
	public application_link?: string;

	@prop({ type: String, required: true })
	public posted_by?: string;

	public static async newPost(
		this: ReturnModelType<typeof Post>,
		post: IPost,
		posted_by: string
	) {
		post = {
			...post,
			title: capitalizeFirstLetterOfEachWordInString(post.title),
		};
		try {
			await this.create({ posted_by, ...post, id: uuid() });
		} catch (e) {
			throw e;
		}
	}

	public static async getPostsBySearchQuery(
		this: ReturnModelType<typeof Post>,
		pagination: IPagination,
		query?: string,
		governorate?: string,
		remote?: RemoteType
	) {
		const { limit, page } = pagination;
		const findArg: any = {};
		if (query) {
			findArg.title = { $regex: new RegExp(query, "i") };
		}
		if (governorate) {
			findArg.governorate = governorate;
		}
		if (remote) {
			findArg.remote = remote === "yes";
		}
		findArg.status = "Open";
		const posts = await Posts.find(findArg)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
			.lean();
		const totalPosts = await Posts.count(findArg);
		return [posts, totalPosts];
	}
	public static async getLatestPosts(
		this: ReturnModelType<typeof Post>,
		pagination: IPagination
	) {
		const { limit, page } = pagination;
		const posts = await Posts.find({ status: "Open" })
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
			.lean();
		const totalPosts = await Posts.countDocuments();
		return [posts, totalPosts];
	}

	public static async getRecruiterPosts(
		this: ReturnModelType<typeof Post>,
		recruiter_name: string
	) {
		const posts = await Posts.find({ posted_by: recruiter_name })
			.sort({ createdAt: -1 })
			.lean();
		return posts;
	}

	public static async getCompanyPosts(
		this: ReturnModelType<typeof Post>,
		company_name: string
	) {
		const posts = await Posts.find({ company_name })
			.sort({ createdAt: -1 })
			.lean();
		return posts;
	}

	public async updatePost(this: DocumentType<Post>, post: IPost) {
		this.title = post.title;
		this.type = post.type;
		this.remote = post.remote;
		this.salary = post.salary;
		this.description = post.description;
		this.application_link = post.application_link;
		this.status = post.status;
		try {
			this.save();
		} catch (e) {
			throw e;
		}
	}
}

export const Posts = getModelForClass(Post, {
	schemaOptions: { collection: "posts" },
});
