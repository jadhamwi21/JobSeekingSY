import styled from "styled-components";

export const HeadlineHeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

export const HeadlineHeaderTitle = styled.h1`
	color: var(--blue);
	font-size: 35px;
	font-weight: 600;
	@media (max-width: 768px) {
		font-size: 30px;
	}
`;

export const HeadlineHeaderContentLine = styled.p`
	color: var(--dark-gray);
	font-size: 25px;
	width: max-content;
	margin: 0px;
	@media (max-width: 768px) {
		font-size: 20px;
		width: fit-content;
	}
`;
