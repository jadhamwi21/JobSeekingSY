import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { valueType } from "antd/lib/statistic/utils";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";

import * as yup from "yup";
//@ts-ignore
import AbbreviateNumber from "number-abbreviate";
import { createNewPost, updatePost } from "../api/post";
import { selectPostToEdit } from "../redux/selectors/postSelectors";
import { setPostToEdit } from "../redux/slices/PostSlice/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { setMenuSelectedItemThunk } from "../redux/thunks/menuThunk";
import { IPost, SalaryType } from "../types/types";
import {
	formRequiredMessage,
	PostCreateUpdateConfirmationModal,
} from "../utils/utils";
import { useToggle } from "./useToggle";
import { UrlRegex } from "../constants/constants";

const PostCreateFormSchema = yup.object().shape({
	title: yup.string().required(formRequiredMessage("Title")),
	type: yup.string().required(formRequiredMessage("Type")),
	remote: yup.bool().required(formRequiredMessage("Remote")),
	salary: yup.mixed().required(formRequiredMessage("Salary")),
	description: yup.string().required(formRequiredMessage("Description")),
	application_link: yup
		.string()
		.matches(UrlRegex, "Invalid Application URL")
		.required(formRequiredMessage("Application Link")),
});

export const usePostForm = (edit?: boolean) => {
	const { toggleOn, toggleState } = useToggle();
	const Dispatch = useAppDispatch();
	const postToEdit = useAppSelector(selectPostToEdit);
	const initialValues = useMemo((): Omit<
		IPost,
		"company_name" | "id" | "status" | "governorate"
	> => {
		if (edit) {
			return postToEdit!;
		} else {
			return {
				title: "",
				type: "Full-Time",
				remote: false,
				salary: { lowerBound: "200k", upperBound: "800k" },
				description: "",
				application_link: "",
			};
		}
	}, [edit, postToEdit]);
	const { values, errors, handleSubmit, setFieldValue } = useFormik<{
		title: string;
		type: "Full-Time" | "Part-Time";
		remote: boolean;
		salary: SalaryType;
		description: string;
		application_link: string;
	}>({
		initialValues,
		validateOnChange: toggleState,
		validateOnBlur: toggleState,
		enableReinitialize: true,
		validationSchema: PostCreateFormSchema,
		onSubmit: (values, { setSubmitting }) => {
			if (edit) {
				PostCreateUpdateConfirmationModal(
					values,
					() => {
						updatePost({
							...values,
							id: postToEdit?.id!,
							status: postToEdit?.status!,
						}).then(() => {
							Dispatch(setPostToEdit(null));
						});
					},

					"update"
				);
			} else {
				PostCreateUpdateConfirmationModal(
					values,
					() => {
						createNewPost(values)
							.then(() => {
								Dispatch(setMenuSelectedItemThunk("My Posts"));
							})
							.catch(() => {
								setSubmitting(false);
							});
					},
					"create"
				);
			}
		},
	});

	const onSubmit = () => {
		handleSubmit();
		toggleOn();
	};
	const [salaryType, setSalaryType] = useState<"Ranged" | "Fixed">("Ranged");

	const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue("title", e.target.value);
	};

	const typeChangeHandler = (type: string) => {
		setFieldValue("type", type);
	};

	const remoteChangeHandler = (remote: CheckboxChangeEvent) => {
		setFieldValue("remote", remote.target.checked);
	};

	const rangedSalaryChangeHandler = ([lowerBound, upperBound]: [
		number,
		number
	]) => {
		const SLIDER_VALUE_TO_SALARY = 10000;
		lowerBound *= SLIDER_VALUE_TO_SALARY;
		upperBound *= SLIDER_VALUE_TO_SALARY;
		setFieldValue("salary", {
			lowerBound: lowerBound === 0 ? "0k" : AbbreviateNumber(lowerBound),
			upperBound: AbbreviateNumber(upperBound),
		});
	};

	const [fixedSalaryValue, setFixedSalaryValue] = useState<string | number>(0);

	const fixedSalaryChangeHandler = (salary: valueType) => {
		setFixedSalaryValue(salary);
	};

	const fixedSalaryBlurHandler = () => {
		setFieldValue("salary", AbbreviateNumber(fixedSalaryValue));
		setFixedSalaryValue(AbbreviateNumber(fixedSalaryValue));
	};

	const descriptionChangeHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setFieldValue("description", e.target.value);
	};

	const selectSalaryTypeHandler = () => {
		if (salaryType === "Fixed") {
			setSalaryType("Ranged");
			setFieldValue("salary", { lowerBound: 20, upperBound: 80 });
		} else {
			setSalaryType("Fixed");
			setFieldValue("salary", 0);
		}
	};

	const applicationLinkChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setFieldValue("application_link", e.target.value);
	};

	const handlers = {
		titleChangeHandler,
		typeChangeHandler,
		remoteChangeHandler,
		rangedSalaryChangeHandler,
		descriptionChangeHandler,
		selectSalaryTypeHandler,
		fixedSalaryChangeHandler,
		fixedSalaryBlurHandler,
		applicationLinkChangeHandler,
	};

	return { onSubmit, values, errors, handlers, salaryType, fixedSalaryValue };
};
