import React from "react";
import {
	EmojiElement,
	NoResultContainer,
	NoResultContentWrapper,
} from "./NoResult.styles";

type Props = {
	content: string;
};

const NoResult = ({ content }: Props) => {
	return (
		<NoResultContainer>
			<NoResultContentWrapper>
				<EmojiElement>&#128542;</EmojiElement>
				<div>{content}</div>
			</NoResultContentWrapper>
		</NoResultContainer>
	);
};

export default NoResult;
