import axios from "axios";
import { IPost } from "../types/types";

export const getSavedPosts = async (): Promise<{ savedPosts: IPost[] }> => {
	return axios
		.get<{ savedPosts: IPost[] }>("/posts/saved")
		.then(({ data }) => data);
};

export const unsavePost = async (postId: string) => {
	return await axios.delete(`/posts/saved/${postId}`);
};

export const lookupSavedPost = async (
	postId: string
): Promise<{ lookup_result: boolean }> => {
	return await axios
		.get(`/posts/saved/lookup/${postId}`)
		.then(({ data }) => data);
};

export const savePost = async (post: IPost) => {
	return await axios.post("/posts/saved", {
		post,
	});
};
