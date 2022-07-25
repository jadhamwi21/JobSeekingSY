import { Form, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Button from "../../../../../components/Button/Button";
import NoResult from "../../../../../components/NoResult/NoResult";
import PdfUploader from "../../../../../components/PDF/Uploader/PdfUploader";
import PdfViewer from "../../../../../components/PDF/Viewer/PdfViewer";
import PictureUploader from "../../../../../components/PictureUploader/PictureUploader";
import TextArea from "../../../../../components/TextArea/TextArea";
import { Governorates } from "../../../../../constants/governorates";
import { Professions } from "../../../../../constants/professions";
import { getValidateStatus, isEmptyString } from "../../../../../utils/utils";
import { useSeekerSetupForm } from "./SeekerSetupForm.func";
import {
	SeekerSetupFormContainer,
	SeekerSetupFormWrapper,
} from "./SeekerSetupForm.styles";

const SeekerSetupForm = () => {
	const {
		onSubmit,
		isSubmitting,
		errors,
		values,
		setProfession,
		setUploadedProfilePictureUrl,
		setUploadedResumeUrl,
		bioChangeHandler,
		setGovernorate,
	} = useSeekerSetupForm();
	return (
		<SeekerSetupFormContainer>
			<SeekerSetupFormWrapper layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="Profession"
					required={true}
					validateStatus={getValidateStatus(errors.profession)}
					help={errors.profession}
				>
					<Select value={values.profession} onChange={setProfession}>
						{Professions.map((profession) => (
							<Option value={profession}>{profession}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="BIO"
					validateStatus={getValidateStatus(errors.bio)}
					help={errors.bio}
				>
					<TextArea
						height="200px"
						onChange={bioChangeHandler}
						value={values.bio}
					/>
				</Form.Item>
				<Form.Item
					label="Profile Picture"
					validateStatus={getValidateStatus(errors.profile_picture)}
					help={errors.profile_picture}
				>
					<PictureUploader
						setUploadedPictureUrl={setUploadedProfilePictureUrl}
						pictureUrl={values.profile_picture}
					/>
				</Form.Item>

				<Form.Item
					label="Governorate"
					required={true}
					validateStatus={getValidateStatus(errors.governorate)}
					help={errors.governorate}
				>
					<Select
						listHeight={150}
						placement="bottomLeft"
						showSearch
						notFoundContent={<NoResult content="Governorate Not Found" />}
						value={values.governorate}
						onChange={setGovernorate}
					>
						{Governorates.map((governorate: string) => (
							<Option value={governorate}>{governorate}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Resume"
					validateStatus={getValidateStatus(errors.resume)}
					help={errors.resume}
				>
					{isEmptyString(values.resume) ? (
						<PdfUploader updatePdfUrl={setUploadedResumeUrl} />
					) : (
						<PdfViewer
							pdfUrl={values.resume}
							withFullscreenPlugin
							unsetPdfUrl={() => setUploadedResumeUrl("")}
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button buttonType="submit" center isSubmitting={isSubmitting}>
						Submit
					</Button>
				</Form.Item>
			</SeekerSetupFormWrapper>
		</SeekerSetupFormContainer>
	);
};

export default SeekerSetupForm;
