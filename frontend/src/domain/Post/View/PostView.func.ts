import axios from "axios";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { lookupSavedPost, savePost, unsavePost } from "../../../api/savedPost";
import { selectJobSearchPosts } from "../../../redux/selectors/jobSearchSelectors";
import { selectPostToViewId } from "../../../redux/selectors/postSelectors";
import { useAppSelector } from "../../../redux/store/store";
import { IPost } from "../../../types/types";
import { shortDelay } from "../../../utils/utils";

export const usePostView = () => {
	const postToViewId = useAppSelector(selectPostToViewId)!;
	const post = useAppSelector(selectJobSearchPosts)!.find(
		(post) => post.id === postToViewId
	);
	const [loading, setLoading] = useState(true);
	const [isPostSaved, setIsPostSaved] = useState<null | boolean>(null);
	const oldPost = React.useRef<undefined | IPost>(undefined);
	const cachedPost = useMemo(() => {
		if (post) {
			return post;
		} else {
			return oldPost.current;
		}
	}, [post]);
	useEffect(() => {
		lookupSavedPost(post!.id).then(({ lookup_result }) => {
			setIsPostSaved(lookup_result);
		});
	}, []);

	useEffect(() => {
		if (isPostSaved !== null) {
			shortDelay(2).then(() => {
				setLoading(false);
			});
		}
	}, [isPostSaved]);

	const savePostHandler = () => {
		savePost(post!).then(() => {
			setIsPostSaved(true);
		});
	};

	const unsavePostHandler = () => {
		unsavePost(post!.id!).then(() => {
			setIsPostSaved(false);
		});
	};
	useEffect(() => {
		oldPost.current = post;
	}, [post]);

	return {
		post: cachedPost,
		isPostSaved,
		loading,
		unsavePostHandler,
		savePostHandler,
	};
};
