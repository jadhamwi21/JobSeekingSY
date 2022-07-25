import styled from "styled-components";

export const SkeletonWrapper = styled.div<{
	top?: string;
	bottom?: string;
	left?: string;
	right?: string;
	center?: boolean;
}>`
	height: fit-content;
	width: fit-content;
	position: relative;
	top: ${(props) => props.top};
	bottom: ${(props) => props.bottom};
	left: ${(props) => props.left};
	right: ${(props) => props.right};
	display: flex;
	margin: ${(props) => (props.center ? "0 auto" : "initial")};
	flex-direction: column;
`;
