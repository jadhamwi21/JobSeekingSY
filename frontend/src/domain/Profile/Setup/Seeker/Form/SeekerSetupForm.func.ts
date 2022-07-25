import { useFormik } from "formik";
import React from "react";
import { Navigate } from "react-router";
import * as yup from "yup";
import { seekerProfileSetup } from "../../../../../api/profile";
import { userRefreshToken } from "../../../../../api/user";
import { useToggle } from "../../../../../hooks/useToggle";
import { setProfileSetup } from "../../../../../redux/slices/UserSlice/userSlice";
import { useAppDispatch } from "../../../../../redux/store/store";
import { formRequiredMessage } from "../../../../../utils/utils";

const SeekerSetupFormScheme = yup.object().shape({
	profession: yup.string().required(formRequiredMessage("Role")),
	bio: yup.string(),
	profile_picture: yup.string(),
	governorate: yup.string().required(formRequiredMessage("Governorate")),
	resume: yup.string(),
});

export const useSeekerSetupForm = () => {
	const { toggle, toggleState } = useToggle();
	const Dispatch = useAppDispatch();
	const { handleSubmit, isSubmitting, errors, values, setFieldValue } =
		useFormik({
			initialValues: {
				profession: "",
				bio: "",
				profile_picture: "",
				governorate: "",
				resume: "",
			},
			enableReinitialize: true,
			validateOnChange: toggleState,
			validateOnBlur: toggleState,
			validationSchema: SeekerSetupFormScheme,
			onSubmit: (values, { setSubmitting }) => {
				seekerProfileSetup(values)
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

	const setUploadedResumeUrl = (pdfUrl: string) => {
		setFieldValue("resume", pdfUrl);
	};

	const bioChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFieldValue("bio", e.target.value);
	};

	const setGovernorate = (gov: string) => {
		setFieldValue("governorate", gov);
	};

	const setProfession = (profession: string) => {
		setFieldValue("profession", profession);
	};
	return {
		onSubmit,
		isSubmitting,
		errors,
		values,
		setProfession,
		setGovernorate,
		setUploadedProfilePictureUrl,
		setUploadedResumeUrl,
		bioChangeHandler,
	};
};
