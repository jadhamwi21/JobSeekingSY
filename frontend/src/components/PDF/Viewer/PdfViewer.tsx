import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { RenderEnterFullScreenProps } from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { WorkerUrl } from "../../../constants/constants";
import { useFullScreenPlugin } from "./PdfViewer.func";
import {
	DeleteButton,
	FullScreenButton,
	PdfViewerButtonsContainer,
	PdfViewerContainer,
} from "./PdfViewer.styles";

type Props = {
	pdfUrl: string;
	withFullscreenPlugin?: boolean;
	unsetPdfUrl?: () => void;
};

const PdfViewer = ({ pdfUrl, withFullscreenPlugin, unsetPdfUrl }: Props) => {
	const FullscreenPluginInstance = useFullScreenPlugin();

	return (
		<PdfViewerContainer>
			<Worker workerUrl={WorkerUrl}>
				<Viewer
					fileUrl={pdfUrl}
					plugins={[FullscreenPluginInstance]}
					renderLoader={() => <></>}
				/>
				<PdfViewerButtonsContainer>
					{unsetPdfUrl && <DeleteButton onClick={unsetPdfUrl} />}
					{withFullscreenPlugin && (
						<FullscreenPluginInstance.EnterFullScreen>
							{({ onClick }: RenderEnterFullScreenProps) => (
								<FullScreenButton onClick={onClick} />
							)}
						</FullscreenPluginInstance.EnterFullScreen>
					)}
				</PdfViewerButtonsContainer>
			</Worker>
		</PdfViewerContainer>
	);
};

export default PdfViewer;
