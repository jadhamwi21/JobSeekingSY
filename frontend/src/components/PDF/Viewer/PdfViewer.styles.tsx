import styled from "styled-components";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import FullScreenOutlined from "@ant-design/icons/FullscreenOutlined";

export const DeleteButton = styled(DeleteOutlined)`
	height: 32px;
	width: 32px;
`;

export const FullScreenButton = styled(FullScreenOutlined)`
	height: 32px;
	width: 32px;
`;

export const PdfViewerWrapper = styled.div<{ fullScreen: boolean }>`
	margin: 4em 0px;
	height: 50vh;
	& > div > div > div {
		overflow: ${(props) => (props.fullScreen ? "auto" : "hidden")} !important;
	}
	@media (max-width: 768px) {
		width: 80vw;
	}
`;

export const PdfViewerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: auto;
	max-width: 40vw;
	height: auto;
	margin: 0 auto;
	@media (max-width: 768px) {
		align-items: center;
		width: 100%;
	}
`;

export const PdfViewerButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: fit-content;
	margin: 1em auto;
`;
