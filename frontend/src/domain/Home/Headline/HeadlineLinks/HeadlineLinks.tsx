import Link from "../../../../components/Link/Link";
import { HeadlineLinksContainer } from "./HeadlineLink.styles";

type Props = {};

const HeadlineLinks = (props: Props) => {
	return (
		<HeadlineLinksContainer>
			<Link size="B" to="/signup">
				Sign up
			</Link>
			<Link size="B" to="/login">
				Login
			</Link>
		</HeadlineLinksContainer>
	);
};

export default HeadlineLinks;
