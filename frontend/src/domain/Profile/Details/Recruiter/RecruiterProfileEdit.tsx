import { Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import Button from "../../../../components/Button/Button";
import PictureUploader from "../../../../components/PictureUploader/PictureUploader";
import Section from "../../../../components/Section/Section";
import TextArea from "../../../../components/TextArea/TextArea";
import { Governorates } from "../../../../constants/governorates";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import { getValidateStatus } from "../../../../utils/utils";
import ProfileDetailsBody from "../Body/ProfileDetailsBody";
import ProfileTop from "../Top/ProfileTop";
import { useRecruiterProfileEdit } from "./RecruiterProfile.func";
import { RecruiterProfileEditForm } from "./RecruiterProfile.styles";

type Props = {
	toggleEdit: () => void;
};

const RecruiterProfileEdit = ({ toggleEdit }: Props) => {
	useScrollToTop();
	const {
		values,
		profilePictureUploadHandler,
		errors,
		onSubmit,
		isSubmitting,
		companyDescriptionChangeHandler,
		companyNameChangeHandler,
		setGovernorate,
		handleChange,
	} = useRecruiterProfileEdit(toggleEdit);
	return (
		<RecruiterProfileEditForm onFinish={onSubmit} layout="vertical">
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
					label="Governorate"
					required={true}
					validateStatus={getValidateStatus(errors.governorate)}
					help={errors.governorate}
				>
					<Select value={values.governorate} onChange={setGovernorate}>
						{Governorates.map((governorate) => (
							<Option value={governorate}>{governorate}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					validateStatus={getValidateStatus(errors.company_name)}
					help={errors.company_name}
					label="Company Name"
					required={true}
				>
					<Input
						onChange={companyNameChangeHandler}
						value={values.company_name}
					/>
				</Form.Item>
				<Form.Item
					validateStatus={getValidateStatus(errors.company_description)}
					help={errors.company_description}
					label="Company Description"
					required={true}
				>
					<TextArea
						height="200px"
						onChange={companyDescriptionChangeHandler}
						value={values.company_description}
					/>
				</Form.Item>
				<Button buttonType="submit" center isSubmitting={isSubmitting}>
					Save
				</Button>
			</ProfileDetailsBody>
		</RecruiterProfileEditForm>
	);
};

export default RecruiterProfileEdit;
