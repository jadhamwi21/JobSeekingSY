import { Form } from "antd";
import styled from "styled-components";

export const RecruiterSetupFormContainer = styled.div`
	width: 100%;
	height: fit-content;
	padding: 4em;
	display: grid;
	place-items: center;
	@media (max-width: 768px) {
		padding: 0px;
	}
`;

export const RecruiterSetupFormWrapper = styled(Form)`
	width: 25vw;
	@media (max-width: 768px) {
		width: 90vw;
	}
`;
