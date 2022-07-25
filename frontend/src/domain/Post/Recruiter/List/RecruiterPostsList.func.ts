import { Modal } from "antd";
import { useEffect, useState } from "react";
import { getMyPosts, postDelete, updatePost } from "../../../../api/post";
import { setPostToEdit } from "../../../../redux/slices/PostSlice/postSlice";
import { useAppDispatch } from "../../../../redux/store/store";
import { IPost } from "../../../../types/types";
import { shortDelay } from "../../../../utils/utils";

const deleteModal = () => {
	return new Promise((resolve) => {
		Modal.confirm({
			title: "Post",
			content: "are you sure you want to delete this post",
			onOk: () => resolve(true),
		});
	});
};

export const useRecruiterPostsList = () => {
	const [posts, setPosts] = useState<IPost[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			await shortDelay(2);
			await getMyPosts().then(({ posts: fetchedPosts }) => {
				setPosts(fetchedPosts);
				setLoading(false);
			});
		};
		fetchPosts();
	}, []);

	const Dispatch = useAppDispatch();
	const editPost = (post: IPost) => {
		Dispatch(setPostToEdit(post));
	};

	const deletePost = (post: IPost) => {
		deleteModal().then(async () => {
			postDelete(post.id)
				.then(() => {
					setPosts(
						[...posts!].filter((currentPost) => currentPost.id !== post.id)
					);
				})
				.catch((e) => {
					console.log(e);
				});
		});
	};

	const updatePostStatus = (post: IPost, status: "Open" | "Closed") => {
		updatePost({ ...post, status }).then(() => {
			setPosts(
				[...posts!].map((currentPost) => {
					if (post.id === currentPost.id) {
						return { ...currentPost, status };
					} else {
						return currentPost;
					}
				})
			);
		});
	};

	return { editPost, deletePost, posts, loading, updatePostStatus };
};
