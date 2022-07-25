import { Image } from "antd";
import styled from "styled-components";

export const RecruiterCardContainer = styled.div`
	width: 25%;
	padding: 2em 1em;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--gray);
	margin: 0 auto;
`;

export const RecruiterCardProfilePicture = styled(Image)`
	height: 200px;
	width: 200px;
	border-radius: 4px;
	margin-bottom: 1em;
`;
