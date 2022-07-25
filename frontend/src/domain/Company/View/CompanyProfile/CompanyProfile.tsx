import React from "react";
import Section from "../../../../components/Section/Section";
import Typography from "../../../../components/Typography/Typography";
import { ICompany } from "../../../../types/types";

type Props = {
	company: ICompany;
};

const CompanyProfile = ({ company }: Props) => {
	return (
		<>
			<Section title="Company Name">
				<Typography color="blue">{company.name}</Typography>
			</Section>
			<Section title="Company Description">
				<Typography color="blue">{company.description}</Typography>
			</Section>
			<Section title="Governorate">
				<Typography color="blue">{company.governorate}</Typography>
			</Section>
		</>
	);
};

export default CompanyProfile;
