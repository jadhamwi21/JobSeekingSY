import React from "react";
import Section from "../../../../components/Section/Section";
import { IGetProfileDetailsResponse } from "../../../../types/types";
import RecruiterCard from "./RecruiterCard/RecruiterCard";

type Props = {
	recruiter: IGetProfileDetailsResponse;
};

const CompanyRecruiter = ({ recruiter }: Props) => {
	return (
		<>
			<Section title="Recruiter">
				<RecruiterCard recruiter={recruiter} />
			</Section>
		</>
	);
};

export default CompanyRecruiter;
