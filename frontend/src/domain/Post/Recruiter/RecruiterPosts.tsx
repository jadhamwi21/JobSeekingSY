import { AnimatePresence, motion } from "framer-motion";
import { TransitionProps } from "../../../constants/constants";
import { usePostEditShow } from "../../../hooks/usePostEditShow";
import { usePostViewShow } from "../../../hooks/usePostViewShow";
import PostEdit from "../Edit/PostEdit";
import PostView from "../View/PostView";
import RecruiterPostsList from "./List/RecruiterPostsList";

type Props = {};

const RecruiterPosts = (props: Props) => {
	const shouldShowPostView = usePostViewShow();
	const shouldShowPostEdit = usePostEditShow();
	return (
		<AnimatePresence exitBeforeEnter>
			{shouldShowPostEdit ? (
				<PostEdit />
			) : shouldShowPostView ? (
				<PostView />
			) : (
				<RecruiterPostsList />
			)}
		</AnimatePresence>
	);
};

export default RecruiterPosts;
