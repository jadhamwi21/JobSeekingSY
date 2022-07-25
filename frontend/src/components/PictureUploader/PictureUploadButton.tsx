import { PlusOutlined } from "@ant-design/icons";
import { UploadButtonContainer } from "./PictureUploadButton.styles";

const PictureUploadButton = () => {
	return (
		<UploadButtonContainer>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</UploadButtonContainer>
	);
};

export default PictureUploadButton;
