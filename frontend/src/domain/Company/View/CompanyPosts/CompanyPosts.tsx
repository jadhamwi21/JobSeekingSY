import React from "react";
import Button from "../../../../components/Button/Button";
import Section from "../../../../components/Section/Section";
import { setPostToView } from "../../../../redux/slices/PostSlice/postSlice";
import { useAppDispatch } from "../../../../redux/store/store";
import { IPost } from "../../../../types/types";
import PostCard from "../../../Post/Card/PostCard";
import { CompanyPostsContainer } from "./CompanyPosts.styles";

type Props = {
	posts: IPost[];
};

const CompanyPosts = ({ posts }: Props) => {
	const Dispatch = useAppDispatch();
	return (
		<Section title="Posts">
			<CompanyPostsContainer>
				{posts.map((post) => (
					<PostCard post={post}>
						<Button
							buttonType="button"
							onClick={() => Dispatch(setPostToView(post.id))}
						>
							View
						</Button>
					</PostCard>
				))}
			</CompanyPostsContainer>
		</Section>
	);
};

export default CompanyPosts;
