import React from "react";
import {
	ServiceContainer,
	ServiceDescription,
	ServiceIcon,
	ServiceName,
} from "./Service.styles";

type Props = {
	name: string;
	description: string;
	iconSrc: string;
};

const Service = ({ name, description, iconSrc }: Props) => {
	return (
		<ServiceContainer>
			<ServiceIcon src={iconSrc} />
			<ServiceName>{name}</ServiceName>
			<ServiceDescription>{description}</ServiceDescription>
		</ServiceContainer>
	);
};

export default Service;
