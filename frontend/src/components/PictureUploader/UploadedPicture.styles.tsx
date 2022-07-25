import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

export const UploadedPictureContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const RemoveButton = styled(DeleteOutlined)`
	margin: 2em;
`;
