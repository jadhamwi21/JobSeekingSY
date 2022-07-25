import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";
import { TransitionProps } from "../../../constants/constants";
import { usePostViewShow } from "../../../hooks/usePostViewShow";
import useScrollToTop from "../../../hooks/useScrollToTop";
import PostView from "../View/PostView";
import SavedPostsHeader from "./Header/SavedPostsHeader";
import SavedPostsList from "./List/SavedPostsList";

type Props = {};

const SavedPosts = (props: Props) => {
	useScrollToTop();
	const shouldShowPostView = usePostViewShow();

	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div {...TransitionProps} key={shouldShowPostView ? 1 : 0}>
				{shouldShowPostView ? (
					<PostView />
				) : (
					<SavedPostsContainer>
						<SavedPostsHeader />
						<SavedPostsList />
					</SavedPostsContainer>
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export const SavedPostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 25vw;
	padding: 4em 0px;
	margin: 0 auto;
	& > div {
		margin: 2em 0px;
	}
`;

export default SavedPosts;
