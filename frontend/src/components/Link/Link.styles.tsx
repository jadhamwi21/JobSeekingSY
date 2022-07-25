import styled from "styled-components";

export const StyledLink = styled.div<{
	size: "A" | "B" | "C";
	center: number;
}>`
	color: var(--blue);
	border-bottom: solid 1px transparent;
	user-select: none;
	padding-bottom: 0.25em;
	transition: all 0.2s ease;
	display: block;
	width: fit-content;
	margin: ${(props) => (props.center ? "0px auto" : "initial")};
	font-size: ${(props) => {
		if (props.size === "A") {
			return "18px";
		}
		if (props.size === "B") {
			return "16px";
		}
		if (props.size === "C") {
			return "14px";
		}
	}};
	&:hover {
		cursor: pointer;
		border-bottom: solid 1px var(--blue);
		color: var(--blue);
	}
`;
