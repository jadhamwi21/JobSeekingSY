import React from "react";
import ContentLoader from "react-content-loader";
import { SkeletonWrapper } from "./Skeletons.styles";

type Props = {};

const JobsCardsSkeleton = (props: Props) => {
	return (
		<SkeletonWrapper top="40px" center>
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
				<circle cx="47" cy="294" r="3" />
				<circle cx="47" cy="318" r="3" />
				<circle cx="47" cy="337" r="3" />
				<circle cx="127" cy="297" r="3" />
				<circle cx="127" cy="321" r="3" />
				<circle cx="127" cy="340" r="3" />
			</ContentLoader>
		</SkeletonWrapper>
	);
};

export default JobsCardsSkeleton;
