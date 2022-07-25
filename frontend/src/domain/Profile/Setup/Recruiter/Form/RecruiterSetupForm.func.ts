import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { recruiterProfileSetup } from "../../../../../api/profile";
import { userRefreshToken } from "../../../../../api/user";
import { useToggle } from "../../../../../hooks/useToggle";
import { setProfileSetup } from "../../../../../redux/slices/UserSlice/userSlice";
import { useAppDispatch } from "../../../../../redux/store/store";
import { formRequiredMessage } from "../../../../../utils/utils";

const RecruiterSetupFormScheme = yup.object().shape({
	company_name: yup.string().required(formRequiredMessage("Company Name")),
	company_description: yup
		.string()
		.required(formRequiredMessage("Company Description")),
	profile_picture: yup.string(),
	governorate: yup.string().required(formRequiredMessage("Governorate")),
});

export const useRecruiterSetupForm = () => {
	const { toggle, toggleState } = useToggle();
	const Dispatch = useAppDispatch();
	const {
		handleSubmit,
		isSubmitting,
		errors,
		values,
		handleChange,
		setFieldValue,
	} = useFormik({
		initialValues: {
			company_name: "",
			company_description: "",
			profile_picture: "",
			governorate: "",
		},
		enableReinitialize: true,
		validateOnChange: toggleState,
		validateOnBlur: toggleState,
		validationSchema: RecruiterSetupFormScheme,
		onSubmit: (values, { setSubmitting }) => {
			recruiterProfileSetup(values)
				.then(() => {
					userRefreshToken();
				})
				.catch((e) => setSubmitting(false));
		},
	});

	const onSubmit = (values: unknown) => {
		handleSubmit();
		toggle();
	};

	const setUploadedProfilePictureUrl = (imgUrl: string) => {
		setFieldValue("profile_picture", imgUrl);
	};

	const setGovernorate = (gov: string) => {
		setFieldValue("governorate", gov);
	};

	const companyDescriptionChangeHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setFieldValue("company_description", e.target.value);
	};

	return {
		onSubmit,
		isSubmitting,
		errors,
		values,
		setGovernorate,
		handleChange,
		setUploadedProfilePictureUrl,
		companyDescriptionChangeHandler,
	};
};
