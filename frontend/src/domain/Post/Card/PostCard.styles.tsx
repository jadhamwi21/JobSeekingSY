import styled from "styled-components";

export const PostCardContainer = styled.div`
	background-color: var(--gray);
	border-radius: 2px;
	width: 100%;
	color: var(--black);
	padding: 2em 1em;
	margin: 2em 0px;
	& > p {
		margin: 0.75em 0px;
	}
`;

export const PostTitle = styled.p`
	color: var(--blue);
`;

export const PostCompanyName = styled.p``;

export const PostGovernorate = styled.p`
	color: var(--blue);
`;

export const PostRemote = styled.p``;

export const PostSalary = styled.p`
	width: fit-content;
	padding: 0.25em;
	background-color: var(--blue);
	color: white;
	border-radius: 4px;
`;

export const PostDescription = styled.div`
	margin: 2em 0px;
`;

export const JobPostChildrenContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	& > div {
		margin: 0px 1em;
	}
`;
