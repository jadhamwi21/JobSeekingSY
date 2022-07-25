import { Form, InputNumber } from "antd";
import styled from "styled-components";

export const PostCreateTitle = styled.h1`
	font-size: 2.5em;
	color: var(--blue);
`;

export const PostCreateContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 2em 0px;
`;

export const PostCreateForm = styled(Form)`
	width: 50%;
	margin: 2em auto;
`;

export const FormItem = styled(Form.Item)<{
	ItemWidth: `${number}${"px" | "%"}`;
	ItemPadding?: string;
}>`
	width: ${(props) => props.ItemWidth};
	margin: 0em auto;
	padding: ${(props) => props.ItemPadding};
`;

export const FixedSalaryInput = styled(InputNumber)`
	width: 100%;
	margin: 0 auto;
`;
