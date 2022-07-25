import { Image } from "antd";
import styled from "styled-components";

export const ProfileTopContainer = styled.div`
	height: fit-content;
	width: 100%;
	display: grid;
	place-items: center;
	background-color: var(--gray);
	padding: 4em;
	border-top: solid 0.5px white;
`;

export const ProfileTopProfilePicture = styled(Image)`
	height: 200px;
	width: 200px;
	border-radius: 4px;
`;

export const ProfileTopChildrenContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
