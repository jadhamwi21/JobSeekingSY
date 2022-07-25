import React from "react";
import {
	SectionContainer,
	SectionContent,
	SectionTitle,
} from "./Section.styles";

export type SectionContentColorType = "blue" | "dark-gray";

type Props = {
	title: string;
	children: React.ReactNode;
	centerContent?: boolean;
};

const Section = ({ title, children, centerContent }: Props) => {
	return (
		<SectionContainer>
			<SectionTitle>{title}</SectionTitle>
			<SectionContent centered={centerContent ?? false}>
				{children}
			</SectionContent>
		</SectionContainer>
	);
};

export default Section;
