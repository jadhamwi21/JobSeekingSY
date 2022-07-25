import { Form } from "antd";
import styled from "styled-components";

export const LoginFormContainer = styled.div`
	height: calc(100vh - 80px);
	width: 100%;
	display: grid;
	place-items: center;
	padding: 10em 0px;
`;

export const LoginFormWrapper = styled(Form)`
	width: 25vw;
	height: fit-content;
`;
