import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { updateSeekerProfile } from "../../../../api/profile";
import { Governorates } from "../../../../constants/governorates";
import { Professions } from "../../../../constants/professions";
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

const SeekerProfileEditSchema = yup.object().shape({
	profile_picture: yup.string(),
	bio: yup.string(),
	resume: yup.string(),
	first_name: yup.string().required(formRequiredMessage("First Name")),
	middle_name: yup.string(),
	last_name: yup.string().required(formRequiredMessage("Last Name")),
	governorate: yup
		.string()
		.oneOf(Governorates)
		.required("Governorate is required"),
	profession: yup
		.string()
		.oneOf(Professions)
		.required(formRequiredMessage("Profession")),
});

export const useSeekerProfileEdit = (toggleEdit: () => void) => {
	const { toggle, toggleState } = useToggle(false);
	const { governorate, profile_picture, profession, bio, resume, fullName } =
		useAppSelector(selectUserProfileState);
	const Dispatch = useAppDispatch();
	const [profilePictureChanged, setProfilePictureChanged] = useState(false);
	const {
		handleSubmit,
		handleChange,
		values,
		setFieldValue,
		errors,
		isSubmitting,
	} = useFormik({
		initialValues: {
			first_name: fullName!.firstName,
			middle_name: fullName!.middleName ?? "",
			last_name: fullName!.lastName,
			profile_picture: profile_picture
				? getProfilePicturePath(profile_picture)
				: "",
			bio: bio ?? "",
			resume: resume ?? "",
			governorate,
			profession,
		},
		enableReinitialize: true,
		validateOnChange: toggleState,
		validateOnBlur: toggleState,
		validationSchema: SeekerProfileEditSchema,
		onSubmit: (values, { setSubmitting }) => {
			if (!profilePictureChanged) {
				values.profile_picture = "same";
			}
			updateSeekerProfile(values)
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

	const bioChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFieldValue("bio", e.target.value);
	};

	const profilePictureUploadHandler = (url: String) => {
		setFieldValue("profile_picture", url);
		setProfilePictureChanged(true);
	};

	const resumeUploadHandler = (pdfUrl: string) => {
		setFieldValue("resume", pdfUrl);
	};

	const setProfession = (profession: string) => {
		setFieldValue("profession", profession);
	};

	const onSubmit = () => {
		toggle();
		handleSubmit();
	};
	const setGovernorate = (gov: string) => {
		setFieldValue("governorate", gov);
	};

	return {
		values,
		bioChangeHandler,
		profilePictureUploadHandler,
		resumeUploadHandler,
		errors,
		isSubmitting,
		onSubmit,
		setProfession,
		handleChange,
		setGovernorate,
	};
};
