/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import Typography from "../../../../components/Typography/Typography";
import { TransitionProps } from "../../../../constants/constants";
import useIsFirstRender from "../../../../hooks/useIsFirstRender";
import JobsCardsSkeleton from "../../../../layouts/Skeletons/JobsCardsSkeleton";
import {
	selectJobSearchQueryFields,
	selectJobSearchState,
	selectTotalPosts,
} from "../../../../redux/selectors/jobSearchSelectors";
import { selectUserProfileState } from "../../../../redux/selectors/profileSelectors";
import {
	setGovernorate,
	setJobSearchLoading,
} from "../../../../redux/slices/JobSearchSlice/jobSearchSlice";
import { setPostToView } from "../../../../redux/slices/PostSlice/postSlice";
import {
	store,
	useAppDispatch,
	useAppSelector,
} from "../../../../redux/store/store";
import { jobSearchThunk } from "../../../../redux/thunks/jobSearchThunks";
import PostCard from "../../../Post/Card/PostCard";
import { JobSearchResultsContainer, NoResult } from "./JobSearchResults.style";

type Props = {};

const JobSearchResults = (props: Props) => {
	const JobSearchState = useAppSelector(selectJobSearchState);
	const Dispatch = useAppDispatch();

	const [page, setPage] = useState(1);
	const { searchValue, governorate, remote } = useAppSelector(
		selectJobSearchQueryFields
	);
	const { governorate: seekerGovernorate } = useAppSelector(
		selectUserProfileState
	);

	const firstRender = useIsFirstRender();
	useEffect(() => {
		Dispatch(setGovernorate(seekerGovernorate));
		const fetchJobs = () => {
			Dispatch(jobSearchThunk({ page: 1 })).then(() => {
				setPage(1);
			});
		};
		if (firstRender) {
			fetchJobs();
			return;
		}
		Dispatch(setJobSearchLoading(true));
		const timeoutId = setTimeout(fetchJobs, 1000);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [searchValue, governorate, remote]);
	const totalPosts = useAppSelector(selectTotalPosts);
	return (
		<JobSearchResultsContainer>
			<Pagination
				total={totalPosts}
				pageSize={10}
				current={page}
				hideOnSinglePage
				onChange={(newPage) => {
					Dispatch(jobSearchThunk({ page: newPage })).then(() => {
						setPage(newPage);
					});
				}}
			/>
			<AnimatePresence exitBeforeEnter>
				<motion.div {...TransitionProps} key={JobSearchState.loading ? 1 : 0}>
					{JobSearchState.loading ? (
						<JobsCardsSkeleton />
					) : JobSearchState.posts !== null ? (
						JobSearchState.posts.length !== 0 ? (
							JobSearchState.posts.map((post) => (
								<PostCard post={post} key={post.id}>
									<Button
										buttonType="button"
										onClick={() => Dispatch(setPostToView(post.id))}
									>
										View
									</Button>
								</PostCard>
							))
						) : (
							<NoResult>No Results Found</NoResult>
						)
					) : null}
				</motion.div>
			</AnimatePresence>
		</JobSearchResultsContainer>
	);
};

export default JobSearchResults;
