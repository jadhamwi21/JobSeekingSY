import styled from "styled-components";

export const SectionContainer = styled.section`
	margin: 2em;
`;

export const SectionTitle = styled.h1`
	padding: 0px;
`;

export const SectionContent = styled.div<{
	centered: boolean;
}>`
	text-align: ${(props) => (props.centered ? "center" : "left")};
	white-space: pre-wrap;
`;
