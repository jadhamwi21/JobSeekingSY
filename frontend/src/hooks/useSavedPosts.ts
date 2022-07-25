import { useEffect, useState } from "react";
import { getSavedPosts } from "../api/savedPost";
import { IPost } from "../types/types";
import { shortDelay } from "../utils/utils";

export const useSavedPosts = () => {
	const [savedPosts, setSavedPosts] = useState<IPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		shortDelay(1).then(() => {
			getSavedPosts()
				.then(({ savedPosts: fetchedSavedPosts }) => {
					setSavedPosts(fetchedSavedPosts);
				})
				.finally(() => {
					setLoading(false);
				});
		});
	}, []);

	return { savedPosts, loading, setSavedPosts };
};
