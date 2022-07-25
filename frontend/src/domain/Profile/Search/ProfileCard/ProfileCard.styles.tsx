import { Image } from "antd";
import styled from "styled-components";
import Button from "../../../../components/Button/Button";

export const ProfileCardContainer = styled.div<{ expanded: boolean }>`
	height: fit-content;
	width: 21vw;
	padding: 5em 1em;
	background-color: var(--gray);
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	margin: 2em 0px;
`;

export const CardProfilePicture = styled(Image)`
	height: 120px;
	width: 120px;
	border-radius: 6px;
	margin-bottom: 1em;
`;
