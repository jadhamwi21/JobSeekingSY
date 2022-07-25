import React from "react";
import { motion } from "framer-motion";
import { TransitionProps } from "../../constants/constants";

type Props = {
	children: React.ReactNode;
};

const RouteTransition = ({ children }: Props) => {
	return <motion.div {...TransitionProps}>{children}</motion.div>;
};

export default RouteTransition;
