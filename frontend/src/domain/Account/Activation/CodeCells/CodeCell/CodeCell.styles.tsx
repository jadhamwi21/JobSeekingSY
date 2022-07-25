import { Input } from "antd";
import styled from "styled-components";

export const CodeCellContainer = styled.div`
	height: fit-content;
	width: fit-content;
`;

export const CodeCellInput = styled(Input)<{ filled: 1 | 0 }>`
	width: 50px;
	height: 50px;
	text-align: center;
	${(props) =>
		props.filled &&
		`border-color: #737cff;
	box-shadow: 0 0 0 2px rgb(75 81 255 / 20%);
	border-right-width: 1px;
	outline: 0;`};
	text-transform: uppercase;
`;
