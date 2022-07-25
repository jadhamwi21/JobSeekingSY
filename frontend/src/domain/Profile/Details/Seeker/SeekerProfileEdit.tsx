import { Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import Button from "../../../../components/Button/Button";
import PdfUploader from "../../../../components/PDF/Uploader/PdfUploader";
import PdfViewer from "../../../../components/PDF/Viewer/PdfViewer";
import PictureUploader from "../../../../components/PictureUploader/PictureUploader";
import Section from "../../../../components/Section/Section";
import TextArea from "../../../../components/TextArea/TextArea";
import { Governorates } from "../../../../constants/governorates";
import { Professions } from "../../../../constants/professions";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import { getValidateStatus } from "../../../../utils/utils";
import ProfileDetailsBody from "../Body/ProfileDetailsBody";
import ProfileTop from "../Top/ProfileTop";
import { useSeekerProfileEdit } from "./SeekerProfile.func";
import { SeekerProfileEditForm } from "./SeekerProfile.styles";

type Props = {
	toggleEdit: () => void;
};

const SeekerProfileEdit = ({ toggleEdit }: Props) => {
	useScrollToTop();
	const {
		values,
		bioChangeHandler,
		resumeUploadHandler,
		profilePictureUploadHandler,
		errors,
		onSubmit,
		isSubmitting,
		handleChange,
		setProfession,
		setGovernorate,
	} = useSeekerProfileEdit(toggleEdit);
	return (
		<SeekerProfileEditForm onFinish={onSubmit} layout="vertical">
			<ProfileTop>
				<Form.Item label="Profile Picture">
					<PictureUploader
						pictureUrl={values.profile_picture}
						setUploadedPictureUrl={profilePictureUploadHandler}
					/>
				</Form.Item>
			</ProfileTop>
			<ProfileDetailsBody>
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
					label="First Name"
					validateStatus={getValidateStatus(errors.first_name)}
					help={errors.first_name}
					required={true}
				>
					<Input
						value={values.first_name}
						onChange={handleChange}
						name="first_name"
					/>
				</Form.Item>
				<Form.Item
					label="Middle Name"
					validateStatus={getValidateStatus(errors.middle_name)}
					help={errors.middle_name}
				>
					<Input
						value={values.middle_name}
						onChange={handleChange}
						name="middle_name"
					/>
				</Form.Item>
				<Form.Item
					label="Last Name"
					validateStatus={getValidateStatus(errors.last_name)}
					help={errors.last_name}
					required={true}
				>
					<Input
						value={values.last_name}
						onChange={handleChange}
						name="last_name"
					/>
				</Form.Item>
				<Form.Item
					label="Bio"
					validateStatus={getValidateStatus(errors.bio)}
					help={errors.bio}
				>
					<TextArea
						value={values.bio}
						height={"180px"}
						onChange={bioChangeHandler}
					/>
				</Form.Item>
				<Form.Item
					label="Governorate"
					required={true}
					validateStatus={getValidateStatus(errors.profession)}
					help={errors.profession}
				>
					<Select value={values.governorate} onChange={setGovernorate}>
						{Governorates.map((governorate) => (
							<Option value={governorate}>{governorate}</Option>
						))}
					</Select>
				</Form.Item>

				<Section title="Resume" centerContent>
					{!values.resume ? (
						<PdfUploader updatePdfUrl={resumeUploadHandler} />
					) : (
						<PdfViewer
							pdfUrl={values.resume}
							unsetPdfUrl={() => {
								resumeUploadHandler("");
							}}
							withFullscreenPlugin
						/>
					)}
				</Section>
				<Button buttonType="submit" center isSubmitting={isSubmitting}>
					Save
				</Button>
			</ProfileDetailsBody>
		</SeekerProfileEditForm>
	);
};

export default SeekerProfileEdit;
