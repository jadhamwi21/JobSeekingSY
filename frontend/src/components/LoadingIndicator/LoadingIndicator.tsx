import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const antIcon = (
	<LoadingOutlined style={{ fontSize: 40, color: "var(--blue)" }} spin />
);

const Wrapper = styled.div<{ height: string }>`
	height: ${(props) => props.height};
	width: 100%;
	display: grid;
	place-items: center;
`;

type Props = {
	height: string;
};

const LoadingIndicator = ({ height }: Props) => {
	return (
		<Wrapper height={height}>
			<Spin indicator={antIcon} />
		</Wrapper>
	);
};

export default LoadingIndicator;
