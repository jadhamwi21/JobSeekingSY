import React from "react";
import { useNavigate } from "react-router";
import { StyledLink } from "./Link.styles";

type Props = {
	size: "A" | "B" | "C";
	to?: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	children: React.ReactNode;
	center?: boolean;
};

const Link = ({ size, to, onClick, children, center }: Props) => {
	const Navigate = useNavigate();
	return (
		<StyledLink
			onClick={(e) => {
				if (to) {
					Navigate(to);
				} else if (onClick) {
					onClick(e);
				}
			}}
			size={size}
			center={center ? +center : 0}
		>
			{children}
		</StyledLink>
	);
};

export default Link;
