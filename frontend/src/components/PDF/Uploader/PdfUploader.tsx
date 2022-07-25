import { Upload } from "antd";
import { toBase64 } from "../../../utils/utils";
import Button from "../../Button/Button";

type Props = {
	updatePdfUrl: (pdfUrl: string) => void;
};

const PdfUploader = ({ updatePdfUrl }: Props) => {
	return (
		<>
			<Upload
				beforeUpload={() => false}
				onChange={(info) => {
					const { fileList } = info;
					const uploadedPdf = fileList[0].originFileObj;
					toBase64(uploadedPdf, (pdfURL: string) => {
						updatePdfUrl(pdfURL);
					});
				}}
			>
				<Button buttonType="button" center>
					Upload
				</Button>
			</Upload>
		</>
	);
};

export default PdfUploader;
