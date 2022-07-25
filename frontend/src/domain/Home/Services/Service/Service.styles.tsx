import styled from "styled-components";

export const ServiceContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: fit-content;

	& > *:not(:first-child) {
		margin-top: 1.5em;
	}
	@media (max-width: 768px) {
		margin: 1em 0px;
	}
`;

export const ServiceIcon = styled.img`
	height: 50px;
	width: 50px;
`;
export const ServiceName = styled.b`
	color: var(--blue);
	font-size: 20px;
	@media (max-width: 768px) {
	}
`;

export const ServiceDescription = styled.p`
	font-weight: 500;
	width: 225px;
	line-height: 1.8;
	@media (max-width: 768px) {
	}
`;
