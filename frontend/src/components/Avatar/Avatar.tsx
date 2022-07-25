import React from "react";
import { StyledAvatar } from "./Avatar.styles";

type Props = {
	src: string;
};

const Avatar = ({ src }: Props) => {
	return <StyledAvatar src={src} />;
};

export default Avatar;
