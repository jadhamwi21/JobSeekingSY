import {
	HeadlineContainer,
	HeadlineElementsPositionDiv,
} from "./Headline.styles";
import HeadlineHeader from "./HeadlineHeader/HeadlineHeader";
import HeadlineLinks from "./HeadlineLinks/HeadlineLinks";

const Headline = () => {
	return (
		<HeadlineContainer>
			<HeadlineElementsPositionDiv>
				<HeadlineHeader />
				<HeadlineLinks />
			</HeadlineElementsPositionDiv>
		</HeadlineContainer>
	);
};

export default Headline;
