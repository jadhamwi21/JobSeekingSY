import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import { TransitionProps } from "../../constants/constants";
import CompanyView from "../../domain/Company/View/CompanyView";
import PostView from "../../domain/Post/View/PostView";
import { useCompanyViewShow } from "../../hooks/useCompanyViewShow";
import { usePostViewShow } from "../../hooks/usePostViewShow";

type Props = {
	children: React.ReactNode;
};

const DashboardViewWrapper = ({ children }: Props) => {
	const shouldShowPostView = usePostViewShow();
	const shouldShowCompanyView = useCompanyViewShow();
	const transitionKey = useMemo(() => {
		if (shouldShowPostView && shouldShowCompanyView) {
			return 0;
		} else if (shouldShowPostView) {
			return 1;
		} else if (shouldShowCompanyView) {
			return 2;
		} else {
			return 3;
		}
	}, [shouldShowCompanyView, shouldShowPostView]);
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div {...TransitionProps} key={transitionKey}>
				{shouldShowPostView ? (
					<PostView />
				) : shouldShowCompanyView ? (
					<CompanyView />
				) : (
					children
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default DashboardViewWrapper;
