import { Image } from "antd";
import styled from "styled-components";

export const MenuContainer = styled.div<{ open: boolean }>`
	top: 80px;
	left: 100%;
	position: fixed;
	background-color: var(--gray);
	width: 300px;
	height: calc(100vh - 80px);
	transition: all 0.35s ease;
	transform: translateX(${(props) => (props.open ? "-100%" : "0")});
	padding: 2em 1em;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	overflow: auto;
	z-index: 10;
	&::-webkit-scrollbar {
		width: 0px;
	}
	& > * {
		margin: 1em 0px;
	}
`;

export const MenuProfilePicture = styled(Image)`
	height: 250px;
	width: 250px;
	border-radius: 4px;
`;
