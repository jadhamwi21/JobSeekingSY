import React from "react";
import Helmet from "react-helmet";

type Props = {
	title: string;
};

const TabTitle = ({ title }: Props) => {
	return (
		<Helmet>
			<title>{title}</title>
		</Helmet>
	);
};

export default TabTitle;
