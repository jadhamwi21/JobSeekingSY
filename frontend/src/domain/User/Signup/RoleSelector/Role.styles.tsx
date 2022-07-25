import { Image } from "antd";
import styled from "styled-components";

export const RoleCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: fit-content;
	padding: 4em 2em;
	border-radius: 4px;
	transition: all 0.2s ease;
	&:hover {
		cursor: pointer;
		background-color: var(--blue);
		color: white;
	}
`;

export const RoleIcon = styled(Image)``;

export const RoleName = styled.p`
	font-size: 18px;
	padding-top: 1.5em;
`;
