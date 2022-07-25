import styled from "styled-components";

export const TypographyElement = styled.p<{
	color: "blue" | "dark-gray" | "black";
}>`
	font-size: 17px;
	color: var(--${(props) => props.color});
	padding: 0px;
	margin: 0px;
`;
