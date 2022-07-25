import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import styled from "styled-components";
import DashboardViewWrapper from "../../../components/DashboardViewWrapper/DashboardViewWrapper";
import { TransitionProps } from "../../../constants/constants";
import { useCompanyViewShow } from "../../../hooks/useCompanyViewShow";
import { usePostViewShow } from "../../../hooks/usePostViewShow";

import TabTitle from "../../../layouts/TabTitle/TabTitle";
import CompanyView from "../../Company/View/CompanyView";
import PostView from "../../Post/View/PostView";
import JobSearcher from "./Form/JobSearchForm";
import JobSearchResults from "./Results/JobSearchResults";

type Props = {};

const JobSearch = (props: Props) => {
	return (
		<DashboardViewWrapper>
			<TabTitle title="Search For Job" />
			<JobSearchContainer>
				<JobSearcher />
				<JobSearchResults />
			</JobSearchContainer>
		</DashboardViewWrapper>
	);
};

export const JobSearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 8em 0px;
`;

export default JobSearch;
