import React from "react";
import { ButtonElement } from "./Button.styles";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
	<LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
);

type Props = {
	children: React.ReactNode;
	buttonType: "submit" | "button";
	center?: boolean;
	isSubmitting?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	color?: "red" | "gray" | "blue" | "black";
	hidden?: boolean;
};

const Button = ({
	children,
	buttonType,
	center,
	isSubmitting,
	onClick,
	disabled,
	color,
	hidden,
}: Props) => {
	return (
		<ButtonElement
			type={buttonType}
			center={center ? +center : 0}
			onClick={onClick}
			disabled={disabled}
			buttonColor={color ?? "blue"}
			style={{ display: hidden ? "none" : "block" }}
		>
			{isSubmitting ? <Spin indicator={antIcon} /> : children}
		</ButtonElement>
	);
};

export default Button;
