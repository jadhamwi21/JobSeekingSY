import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../../components/Button/Button";
import Link from "../../../../components/Link/Link";
import NoResult from "../../../../components/NoResult/NoResult";
import { TransitionProps } from "../../../../constants/constants";
import JobsCardsSkeleton from "../../../../layouts/Skeletons/JobsCardsSkeleton";
import PostCard from "../../Card/PostCard";
import { useRecruiterPostsList } from "./RecruiterPostsList.func";
import {
	RecruiterPostsContainer,
	RecruiterPostsHeader,
	RecruiterPostsListContainer,
} from "./RecruiterPostsList.styles";

type Props = {};

const RecruiterPostsList = (props: Props) => {
	const { editPost, deletePost, posts, loading, updatePostStatus } =
		useRecruiterPostsList();

	const noPosts = posts?.length === 0 && loading === false;
	return (
		<motion.div {...TransitionProps} key="RecruiterPostsList">
			<RecruiterPostsContainer>
				<RecruiterPostsHeader>
					{noPosts ? <NoResult content="No Posts" /> : "Posts"}
				</RecruiterPostsHeader>
			</RecruiterPostsContainer>
			<AnimatePresence exitBeforeEnter>
				<motion.div {...TransitionProps} key={loading ? 1 : 0}>
					{loading ? (
						<JobsCardsSkeleton />
					) : (
						<RecruiterPostsListContainer>
							{posts!.map((post) => (
								<PostCard post={post}>
									<Button
										onClick={() => {
											editPost(post);
										}}
										buttonType="button"
										color="blue"
									>
										Edit
									</Button>
									<Button
										onClick={() => {
											deletePost(post);
										}}
										buttonType="button"
										color="red"
									>
										Delete
									</Button>
									<Link
										onClick={() => {
											updatePostStatus(
												post,
												post.status === "Open" ? "Closed" : "Open"
											);
										}}
										size="C"
									>
										{post.status === "Open" ? "Close" : "Open"}
									</Link>
								</PostCard>
							))}
						</RecruiterPostsListContainer>
					)}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
};

export default RecruiterPostsList;
