import styled from "styled-components";

export const JobCardContainer = styled.div`
	background-color: var(--gray);
	border-radius: 2px;
	width: 100%;
	color: var(--black);
	padding: 2em 1em;
	& > p {
		margin: 0.75em 0px;
	}
`;

export const JobTitle = styled.p`
	color: var(--blue);
`;

export const CompanyName = styled.p``;

export const Governorate = styled.p`
	color: var(--blue);
`;

export const Remote = styled.p``;

export const Salary = styled.p`
	width: fit-content;
	padding: 0.25em;
	background-color: var(--blue);
	color: white;
	border-radius: 4px;
`;
