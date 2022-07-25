import { Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";

import Button from "../../../../../components/Button/Button";
import NoResult from "../../../../../components/NoResult/NoResult";
import PictureUploader from "../../../../../components/PictureUploader/PictureUploader";
import TextArea from "../../../../../components/TextArea/TextArea";
import { Governorates } from "../../../../../constants/governorates";
import { getValidateStatus } from "../../../../../utils/utils";
import { useRecruiterSetupForm } from "./RecruiterSetupForm.func";
import {
	RecruiterSetupFormContainer,
	RecruiterSetupFormWrapper,
} from "./RecruiterSetupForm.styles";

const RecruiterSetupForm = () => {
	const {
		onSubmit,
		isSubmitting,
		errors,
		values,
		handleChange,
		setUploadedProfilePictureUrl,
		setGovernorate,
		companyDescriptionChangeHandler,
	} = useRecruiterSetupForm();

	return (
		<RecruiterSetupFormContainer>
			<RecruiterSetupFormWrapper layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="Company Name"
					required={true}
					validateStatus={getValidateStatus(errors.company_name)}
					help={errors.company_name}
				>
					<Input name="company_name" onChange={handleChange} />
				</Form.Item>
				<Form.Item
					label="Company Description"
					required={true}
					validateStatus={getValidateStatus(errors.company_description)}
					help={errors.company_description}
				>
					<TextArea
						value={values.company_description}
						onChange={companyDescriptionChangeHandler}
						height="150px"
					/>
				</Form.Item>
				<Form.Item label="Profile Picture">
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
						listHeight={200}
						placement="bottomLeft"
						showSearch
						value={values.governorate}
						notFoundContent={<NoResult content="Governorate Not Found" />}
						onChange={setGovernorate}
					>
						{Governorates.map((governorate: string) => (
							<Option value={governorate}>{governorate}</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item>
					<Button buttonType="submit" center isSubmitting={isSubmitting}>
						Submit
					</Button>
				</Form.Item>
			</RecruiterSetupFormWrapper>
		</RecruiterSetupFormContainer>
	);
};

export default RecruiterSetupForm;
