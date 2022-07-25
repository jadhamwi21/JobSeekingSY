import React from "react";
import { ProfileDetailsBodyContainer } from "./ProfileDetailsBody.styles";

type Props = {
	children: React.ReactNode;
};

const ProfileDetailsBody = ({ children }: Props) => {
	return <ProfileDetailsBodyContainer>{children}</ProfileDetailsBodyContainer>;
};

export default ProfileDetailsBody;
