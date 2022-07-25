import { Form } from "antd";
import styled from "styled-components";

export const SeekerSetupFormContainer = styled.div`
	width: 100%;
	height: fit-content;
	display: grid;
	place-items: center;
`;

export const SeekerSetupFormWrapper = styled(Form)`
	width: 30vw;
	padding: 4em 0px;
	@media (max-width: 768px) {
		width: 90%;
	}
`;
