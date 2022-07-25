import axios from "axios";
import { store } from "../redux/store/store";
import { IMyPostsResponse, IPost } from "../types/types";
import { formatSalary } from "../utils/utils";

export const postDelete = async (postId: string) => {
	const { company_name } = store.getState().Profile;
	return axios.delete(`/post/${postId}`, {
		data: {
			company_name,
		},
	});
};

export const createNewPost = async (
	post: Omit<IPost, "company_name" | "id" | "status" | "governorate">
) => {
	const { company_name, governorate } = store.getState().Profile;
	const salary = formatSalary(post.salary);
	return await axios.post("/post", {
		...post,
		company_name,
		status: "Open",
		salary,
		governorate,
	});
};

export const updatePost = async (
	post: Omit<IPost, "company_name" | "governorate">
) => {
	const { company_name, governorate } = store.getState().Profile;
	const salary = formatSalary(post.salary);
	return await axios.put(`/post/${post.id}`, {
		...post,
		company_name,
		salary,
		governorate,
	});
};

export const getMyPosts = async (): Promise<IMyPostsResponse> => {
	return await axios.get("/posts/recruiter").then(({ data }) => data);
};

export const getCompanyPosts = async (
	company_name: string
): Promise<{ posts: IPost[] }> => {
	return await axios.get(`/posts/${company_name}`).then(({ data }) => data);
};
