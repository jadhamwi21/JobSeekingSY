import React from "react";
import {
	HeadlineHeaderContainer,
	HeadlineHeaderContentLine,
	HeadlineHeaderTitle,
} from "./HeadlineHeader.styles";

type Props = {};

const HeadlineHeader = (props: Props) => {
	return (
		<HeadlineHeaderContainer>
			<HeadlineHeaderTitle>Best Place To</HeadlineHeaderTitle>
			<HeadlineHeaderContentLine>
				Find a Job as a Seeker
			</HeadlineHeaderContentLine>
			<HeadlineHeaderContentLine>
				Hire People as a Recruiter
			</HeadlineHeaderContentLine>
		</HeadlineHeaderContainer>
	);
};

export default HeadlineHeader;
