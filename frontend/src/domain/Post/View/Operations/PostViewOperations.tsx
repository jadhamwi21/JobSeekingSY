import Button from "../../../../components/Button/Button";
import Link from "../../../../components/Link/Link";
import { useAppDispatch } from "../../../../redux/store/store";
import { IPost } from "../../../../types/types";
import { PostViewOperationsContainer } from "./PostViewOperations.styles";

type Props = {
	viewedPost: IPost;
	savePost: () => void;
	unsavePost: () => void;
	isPostSaved: boolean;
};

const PostViewOperations = ({
	viewedPost,
	savePost,
	unsavePost,
	isPostSaved,
}: Props) => {
	const openUrlInNewTab = (url: string) => {
		window.open(`//${url}`, "_blank", "noopener,noreferrer");
	};

	return (
		<PostViewOperationsContainer>
			<Button
				buttonType="button"
				onClick={() => openUrlInNewTab(viewedPost.application_link)}
			>
				Apply
			</Button>
			<Link
				size="C"
				onClick={() => {
					isPostSaved ? unsavePost() : savePost();
				}}
			>
				{isPostSaved ? "Unsave" : "Save"}
			</Link>
		</PostViewOperationsContainer>
	);
};

export default PostViewOperations;
