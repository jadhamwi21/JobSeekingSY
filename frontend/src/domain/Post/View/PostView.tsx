import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import NoResult from "../../../components/NoResult/NoResult";
import PageNavigation from "../../../components/PageNavigation/PageNavigation";
import PostOverview from "../../../components/PostOverview/PostOverview";
import Section from "../../../components/Section/Section";
import Typography from "../../../components/Typography/Typography";
import { TransitionProps } from "../../../constants/constants";
import useScrollToTop from "../../../hooks/useScrollToTop";
import PostViewSkeleton from "../../../layouts/Skeletons/PostViewSkeleton";
import TabTitle from "../../../layouts/TabTitle/TabTitle";
import { isNull } from "../../../utils/utils";
import PostViewOperations from "./Operations/PostViewOperations";
import { usePostView } from "./PostView.func";

const PostView = () => {
	useScrollToTop();
	const { post, loading, isPostSaved, savePostHandler, unsavePostHandler } =
		usePostView();
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div {...TransitionProps} key={loading ? 1 : 0}>
				{loading ? (
					<PostViewSkeleton />
				) : !isNull(post) ? (
					<>
						<TabTitle title="Post Page" />
						<PageNavigation page="Post" />
						<PostViewContainer>
							<PostOverview post={post!} />
							<Section title={"Job Type"} centerContent>
								<Typography color="blue">{post!.type}</Typography>
							</Section>
							<Section title={"Job Status"} centerContent>
								<Typography color="blue">{post!.status}</Typography>
							</Section>
							<Section title={"Job Description"}>
								<Typography color="dark-gray">{post!.description}</Typography>
							</Section>
							<PostViewOperations
								viewedPost={post!}
								isPostSaved={isPostSaved!}
								savePost={savePostHandler}
								unsavePost={unsavePostHandler}
							/>
						</PostViewContainer>
					</>
				) : null}
			</motion.div>
		</AnimatePresence>
	);
};

export const PostViewContainer = styled.div`
	padding: 2em;
	position: relative;
	height: calc(100vh - 80px);
`;

export default PostView;
