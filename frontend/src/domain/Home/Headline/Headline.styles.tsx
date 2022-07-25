import styled from "styled-components";
import HeadlineBackgroundImage from "../../../assets/images/Headline.jpg";

export const HeadlineContainer = styled.section`
	height: calc(100vh - 80px);
	width: 100%;
	background-image: url(${HeadlineBackgroundImage});
	background-size: cover;
	position: relative;
	@media (max-width: 768px) {
		background-image: none;
		display: grid;
		place-items: center;
		height: fit-content;
		height: 80vh;
	}
`;

export const HeadlineElementsPositionDiv = styled.div`
	position: absolute;
	top: 45%;
	right: 35%;
	transform: translate(35%, -45%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 768px) {
		position: initial;
		top: 0%;
		right: 0%;
		transform: initial;
	}
`;
