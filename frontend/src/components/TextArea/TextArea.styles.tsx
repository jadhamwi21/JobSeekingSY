import { Input } from "antd";
import styled from "styled-components";

export const StyledTextArea = styled(Input.TextArea)`
	resize: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;
