import React from "react";
import ContentLoader from "react-content-loader";
import { SkeletonWrapper } from "./Skeletons.styles";

type Props = {};

const ChatsPaneConversationsSkeleton = (props: Props) => {
	return (
		<SkeletonWrapper top="0px">
			<ContentLoader
				speed={2}
				width={300}
				height={200}
				viewBox="0 0 300 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
				title=""
			>
				<circle cx="27" cy="83" r="13" />
				<rect x="51" y="71" rx="0" ry="0" width="141" height="24" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={300}
				height={200}
				viewBox="0 0 300 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<circle cx="27" cy="83" r="13" />
				<rect x="51" y="71" rx="0" ry="0" width="141" height="24" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={300}
				height={200}
				viewBox="0 0 300 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<circle cx="27" cy="83" r="13" />
				<rect x="51" y="71" rx="0" ry="0" width="141" height="24" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={300}
				height={200}
				viewBox="0 0 300 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<circle cx="27" cy="83" r="13" />
				<rect x="51" y="71" rx="0" ry="0" width="141" height="24" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={300}
				height={200}
				viewBox="0 0 300 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<circle cx="27" cy="83" r="13" />
				<rect x="51" y="71" rx="0" ry="0" width="141" height="24" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={300}
				height={200}
				viewBox="0 0 300 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<circle cx="27" cy="83" r="13" />
				<rect x="51" y="71" rx="0" ry="0" width="141" height="24" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={300}
				height={200}
				viewBox="0 0 300 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<circle cx="27" cy="83" r="13" />
				<rect x="51" y="71" rx="0" ry="0" width="141" height="24" />
			</ContentLoader>
		</SkeletonWrapper>
	);
};

export default ChatsPaneConversationsSkeleton;
