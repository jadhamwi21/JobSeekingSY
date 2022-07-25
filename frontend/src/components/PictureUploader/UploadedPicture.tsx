import { Image } from "antd";
import {
	RemoveButton,
	UploadedPictureContainer,
} from "./UploadedPicture.styles";

type Props = {
	remove: () => void;
	pictureUrl: string;
	forView?: boolean;
};

const UploadedPicture = ({ remove, pictureUrl }: Props) => {
	return (
		<UploadedPictureContainer>
			<Image src={pictureUrl} preview={true} height={"250px"} width={"250px"} />
			<RemoveButton onClick={remove} />
		</UploadedPictureContainer>
	);
};

export default UploadedPicture;
