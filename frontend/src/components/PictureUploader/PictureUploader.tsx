import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { isEmptyString, toBase64 } from "../../utils/utils";
import PictureUploadButton from "./PictureUploadButton";
import UploadedPicture from "./UploadedPicture";

type Props = {
	pictureUrl: string;
	setUploadedPictureUrl: (url: string) => void;
};

const PictureUploader = ({ pictureUrl, setUploadedPictureUrl }: Props) => {
	return isEmptyString(pictureUrl) ? (
		<ImgCrop quality={0.8} aspect={1}>
			<Upload
				listType="picture"
				showUploadList={false}
				maxCount={1}
				beforeUpload={(file) => {
					toBase64(file, (imgUrl: string) => {
						setUploadedPictureUrl(imgUrl);
					});
					return false;
				}}
			>
				<PictureUploadButton />
			</Upload>
		</ImgCrop>
	) : (
		<UploadedPicture
			remove={() => setUploadedPictureUrl("")}
			pictureUrl={pictureUrl}
		/>
	);
};

export default PictureUploader;
