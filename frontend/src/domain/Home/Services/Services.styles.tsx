import styled from "styled-components";

export const ServicesContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: fit-content;
	padding: 6em 0px;
	@media (max-width: 768px) {
		width: 100%;
		padding: 1em 0px 4em 0px;
	}
`;

export const ServicesTitle = styled.h1`
	color: var(--blue);
	font-size: 30px;
	margin-bottom: 4em;
`;

export const ServicesFlexbox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 70%;
	height: fit-content;
	@media (max-width: 768px) {
		flex-direction: column;
		width: 100%;
		padding: 0px 0.75em;
		justify-content: center;
	}
`;
