import { useFormik } from "formik";
import * as yup from "yup";
import { useToggle } from "../../../../hooks/useToggle";
import { useAppDispatch } from "../../../../redux/store/store";
import { userLoginThunk } from "../../../../redux/thunks/userThunks";

const LoginFormSchema = yup.object().shape({
	username_or_email: yup
		.string()
		.required("you must enter your username or email"),
	password: yup.string().required("you must enter your password"),
});

export const useLoginForm = () => {
	const { toggleOn, toggleState } = useToggle(false);
	const Dispatch = useAppDispatch();
	const { errors, handleChange, handleSubmit, values, isSubmitting } =
		useFormik({
			initialValues: {
				username_or_email: "",
				password: "",
			},
			validateOnChange: toggleState,
			validationSchema: LoginFormSchema,
			validateOnBlur: toggleState,
			enableReinitialize: true,
			onSubmit: (values, { setSubmitting }) => {
				// Mock
				Dispatch(
					userLoginThunk({
						username_email: values.username_or_email,
						password: values.password,
					})
				)
					.unwrap()
					.catch((e) => setSubmitting(false));
			},
		});
	const onSubmit = () => {
		toggleOn();
		handleSubmit();
	};
	return { errors, handleChange, onSubmit, values, isSubmitting };
};
