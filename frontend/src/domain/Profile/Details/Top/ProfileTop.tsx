import React from "react";
import {
	ProfileTopChildrenContainer,
	ProfileTopContainer,
} from "./ProfileTop.styles";

type Props = {
	children: React.ReactNode;
};

const ProfileTop = ({ children }: Props) => {
	return (
		<ProfileTopContainer>
			<ProfileTopChildrenContainer>{children}</ProfileTopChildrenContainer>
		</ProfileTopContainer>
	);
};

export default ProfileTop;
