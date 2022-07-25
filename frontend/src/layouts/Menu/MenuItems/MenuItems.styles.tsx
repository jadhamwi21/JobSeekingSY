import styled from "styled-components";

export const MenuItemsFlexbox = styled.div`
	width: 100%;
	height: fit-content;
`;

export const MenuItem = styled.div<{ selected: boolean }>`
	padding: 1em 0px;
	cursor: pointer;
	transition: all 0.2s ease;
	padding-left: 1em;
	font-size: 17px;
	${(props) =>
		props.selected
			? `background-color: var(--blue);
		color: white;
		border-radius: 4px;`
			: null}
	&:hover {
		color: ${(props) => (props.selected ? null : "var(--blue)")};
	}
`;
