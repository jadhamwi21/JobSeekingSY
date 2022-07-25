import styled from "styled-components";

export const HeaderContainer = styled.header`
	height: 80px;
	width: 100%;
	background-color: var(--gray);

	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0px 1.5em;
	position: sticky;
	top: 0;
	z-index: 100;
	display: flex;
`;

export const HeaderElementsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
	@media (max-width: 768px) {
		flex-direction: column;
		width: 100%;
	}
`;

export const AppTitle = styled.h1`
	color: var(--blue);
	font-weight: 600;
	margin: 0px 0.25em;
	user-select: none;
	@media (max-width: 768px) {
		display: none;
	} ;
`;
