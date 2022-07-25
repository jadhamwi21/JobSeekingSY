import React from "react";
import ContentLoader from "react-content-loader";
import { SkeletonWrapper } from "./Skeletons.styles";

type Props = {};

const ChatsPaneTopBarSkeleton = (props: Props) => {
	return (
		<SkeletonWrapper top="20px" center>
			<ContentLoader
				speed={2}
				width={200}
				height={200}
				viewBox="0 0 200 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
				title=""
			>
				<circle cx="48" cy="82" r="13" />
				<rect x="77" y="73" rx="0" ry="0" width="69" height="19" />
			</ContentLoader>
		</SkeletonWrapper>
	);
};

export default ChatsPaneTopBarSkeleton;
