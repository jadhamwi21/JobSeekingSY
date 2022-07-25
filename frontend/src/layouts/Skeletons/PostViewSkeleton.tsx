import React from "react";
import ContentLoader from "react-content-loader";
import { SkeletonWrapper } from "./Skeletons.styles";

type Props = {};

const PostViewSkeleton = (props: Props) => {
	return (
		<SkeletonWrapper left="40px" top="30px">
			<ContentLoader
				speed={2}
				width={600}
				height={200}
				viewBox="0 0 600 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
				title=""
			>
				<rect x="6" y="14" rx="4" ry="4" width="144" height="15" />
				<rect x="5" y="48" rx="4" ry="4" width="307" height="14" />
				<rect x="10" y="80" rx="4" ry="4" width="144" height="15" />
				<rect x="9" y="114" rx="4" ry="4" width="307" height="14" />
				<rect x="9" y="147" rx="4" ry="4" width="221" height="14" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={600}
				height={200}
				viewBox="0 0 600 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<rect x="6" y="14" rx="4" ry="4" width="144" height="15" />
				<rect x="5" y="48" rx="4" ry="4" width="307" height="14" />
				<rect x="10" y="80" rx="4" ry="4" width="144" height="15" />
				<rect x="9" y="114" rx="4" ry="4" width="307" height="14" />
				<rect x="9" y="147" rx="4" ry="4" width="221" height="14" />
			</ContentLoader>
			<ContentLoader
				speed={2}
				width={600}
				height={200}
				viewBox="0 0 600 200"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
			>
				<rect x="6" y="14" rx="4" ry="4" width="144" height="15" />
				<rect x="5" y="48" rx="4" ry="4" width="307" height="14" />
				<rect x="10" y="80" rx="4" ry="4" width="144" height="15" />
				<rect x="9" y="114" rx="4" ry="4" width="307" height="14" />
				<rect x="9" y="147" rx="4" ry="4" width="221" height="14" />
			</ContentLoader>
		</SkeletonWrapper>
	);
};

export default PostViewSkeleton;
