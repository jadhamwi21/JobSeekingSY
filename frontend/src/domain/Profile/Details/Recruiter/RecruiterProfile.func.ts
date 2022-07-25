import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import {
	getMyProfileDetails,
	updateRecruiterProfile,
} from "../../../../api/profile";
import { Governorates } from "../../../../constants/governorates";
import { useToggle } from "../../../../hooks/useToggle";
import { selectUserProfileState } from "../../../../redux/selectors/profileSelectors";
import { resetProfileSlice } from "../../../../redux/slices/ProfileSlice/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { getMyProfileDetailsThunk } from "../../../../redux/thunks/profileThunks";
import {
	formRequiredMessage,
	getProfilePicturePath,
	shortDelay,
} from "../../../../utils/utils";

const RecruiterProfileEditSchema = yup.object().shape({
	profile_picture: yup.string(),
	company_name: yup.string().required(formRequiredMessage("Company Name")),
	company_description: yup
		.string()
		.required(formRequiredMessage("Company Description")),
	first_name: yup.string().required(formRequiredMessage("First Name")),
	middle_name: yup.string(),
	last_name: yup.string().required(formRequiredMessage("Last Name")),
	governorate: yup
		.string()
		.oneOf(Governorates)
		.required("Governorate is required"),
});

export const useRecruiterProfileEdit = (toggleEdit: () => void) => {
	const { toggle, toggleState } = useToggle(false);
	const Dispatch = useAppDispatch();
	const {
		governorate,
		company_description,
		company_name,
		fullName,
		profile_picture,
	} = useAppSelector(selectUserProfileState);
	const [profilePictureChanged, setProfilePictureChanged] = useState(false);
	const {
		handleSubmit,
		values,
		setFieldValue,
		errors,
		isSubmitting,
		handleChange,
	} = useFormik({
		initialValues: {
			profile_picture: profile_picture
				? getProfilePicturePath(profile_picture)
				: "",
			company_name: company_name!,
			company_description: company_description!,
			first_name: fullName!.firstName,
			middle_name: fullName!.middleName ?? "",
			last_name: fullName!.lastName,
			governorate,
		},
		enableReinitialize: true,
		validateOnChange: toggleState,
		validateOnBlur: toggleState,
		validationSchema: RecruiterProfileEditSchema,
		onSubmit: (values, { setSubmitting }) => {
			if (!profilePictureChanged) {
				values.profile_picture = "same";
			}
			updateRecruiterProfile(values)
				.then(async () => {
					Dispatch(resetProfileSlice());
					await shortDelay(2);
					Dispatch(getMyProfileDetailsThunk());
					toggleEdit();
				})
				.catch(() => {
					setSubmitting(false);
				});
		},
	});

	const setGovernorate = (governorate: string) => {
		setFieldValue("governorate", governorate);
	};
	const profilePictureUploadHandler = (url: String) => {
		setFieldValue("profile_picture", url);
		setProfilePictureChanged(true);
	};

	const companyNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue("company_name", e.target.value);
	};

	const companyDescriptionChangeHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setFieldValue("company_description", e.target.value);
	};

	const onSubmit = () => {
		toggle();
		handleSubmit();
	};

	return {
		values,
		companyNameChangeHandler,
		profilePictureUploadHandler,
		companyDescriptionChangeHandler,
		errors,
		isSubmitting,
		setGovernorate,
		onSubmit,
		handleChange,
	};
};
