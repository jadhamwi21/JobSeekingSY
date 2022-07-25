import React from "react";
import { TypographyElement } from "./Typography.styles";

type Props = {
	color: "blue" | "dark-gray" | "black";
	children: string;
};

export const Typography = ({ color, children }: Props) => {
	return <TypographyElement color={color}>{children}</TypographyElement>;
};

export default Typography;
