import LinesEllipsis from "react-lines-ellipsis";
import PostOverview from "../../../components/PostOverview/PostOverview";
import { IPost } from "../../../types/types";
import {
	JobPostChildrenContainer,
	PostCardContainer,
	PostDescription,
} from "./PostCard.styles";

type Props = {
	post: IPost;
	children: React.ReactNode;
};

const PostCard = ({ post, children }: Props) => {
	return (
		<PostCardContainer>
			<PostOverview post={post} />
			<PostDescription>
				<LinesEllipsis
					text={post.description}
					maxLine="10"
					ellipsis="..."
					trimRight
					basedOn="letters"
					style={{ margin: "2em 0px" }}
				/>
			</PostDescription>
			<JobPostChildrenContainer>{children}</JobPostChildrenContainer>
		</PostCardContainer>
	);
};

export default PostCard;
