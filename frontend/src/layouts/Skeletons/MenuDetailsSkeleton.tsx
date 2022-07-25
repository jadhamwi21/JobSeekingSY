import React from "react";
import ContentLoader from "react-content-loader";
import { SkeletonWrapper } from "./Skeletons.styles";

type Props = {};

const MenuDetailsSkeleton = (props: Props) => {
	return (
		<SkeletonWrapper center>
			<ContentLoader
				speed={2}
				width={200}
				height={400}
				viewBox="0 0 200 400"
				backgroundColor="#d6d6d6"
				foregroundColor="#ecebeb"
				{...props}
				title=""
			>
				<rect x="9" y="14" rx="6" ry="6" width="162" height="253" />
				<rect x="11" y="290" rx="6" ry="6" width="158" height="27" />
			</ContentLoader>
		</SkeletonWrapper>
	);
};

export default MenuDetailsSkeleton;
