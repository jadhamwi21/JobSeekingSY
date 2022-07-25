import styled from "styled-components";

export const ButtonElement = styled.button<{
	center: number;
	buttonColor: string;
}>`
	outline: none;
	border: none;
	background-color: ${(props) => {
		switch (props.buttonColor) {
			case "blue":
				return "var(--blue)";
			case "red":
				return "#FF5F5F";
			case "black":
				return "var(--black)";
			case "gray":
				return "#E4E4E4";
		}
	}};
	padding: 0.5em 1em;
	color: ${(props) => (props.buttonColor === "gray" ? "var(--blue)" : "white")};
	cursor: pointer;
	transition: all 0.25s ease;
	border-radius: 4px;
	filter: brightness(90%);
	display: block;
	margin: ${(props) => (props.center ? "1em auto" : "1em")};
	&:hover {
		filter: brightness(100%);
	}
	&:active {
		filter: brightness(90%);
	}
`;
