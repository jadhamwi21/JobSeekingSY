import { AnimatePresence, motion } from "framer-motion";
import { unsavePost } from "../../../../api/savedPost";
import Button from "../../../../components/Button/Button";
import Link from "../../../../components/Link/Link";
import SelectNoMatch from "../../../../components/NoResult/NoResult";
import { TransitionProps } from "../../../../constants/constants";
import { useSavedPosts } from "../../../../hooks/useSavedPosts";
import JobsCardsSkeleton from "../../../../layouts/Skeletons/JobsCardsSkeleton";
import { setPostToView } from "../../../../redux/slices/PostSlice/postSlice";
import { useAppDispatch } from "../../../../redux/store/store";
import PostCard from "../../Card/PostCard";

type Props = {};

const SavedPostsList = (props: Props) => {
	const { savedPosts, loading, setSavedPosts } = useSavedPosts();
	const noSavedPosts = savedPosts.length === 0 && !loading;
	const Dispatch = useAppDispatch();
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div {...TransitionProps} key={loading ? 1 : 0}>
				{loading ? (
					<JobsCardsSkeleton />
				) : (
					savedPosts.map((post) => (
						<PostCard post={post}>
							<Button
								buttonType="button"
								onClick={() => Dispatch(setPostToView(post.id))}
							>
								View
							</Button>
							<Link
								size="C"
								onClick={() => {
									unsavePost(post.id).then(() => {
										setSavedPosts(
											[...savedPosts].filter(
												(currentPost) => currentPost.id !== post.id
											)
										);
									});
								}}
							>
								Unsave
							</Link>
						</PostCard>
					))
				)}
			</motion.div>
			{noSavedPosts && <SelectNoMatch content="No Saved Posts" />}
		</AnimatePresence>
	);
};

export default SavedPostsList;
