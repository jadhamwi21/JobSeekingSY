import React from "react";
import { StyledTextArea } from "./TextArea.styles";

type Props = {
	value: string;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
	height: string;
};

const TextArea = ({ value, onChange, height }: Props) => {
	return (
		<StyledTextArea onChange={onChange} style={{ height }} value={value} />
	);
};

export default TextArea;
