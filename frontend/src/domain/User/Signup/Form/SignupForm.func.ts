import { useFormik } from "formik";
import { useToggle } from "../../../../hooks/useToggle";
import { Role } from "../../../../types/types";
import * as yup from "yup";
import { formRequiredMessage } from "../../../../utils/utils";
import { useNavigate } from "react-router";
import { userSignup } from "../../../../api/user";

const SignupFormValidationSchema = yup.object().shape({
	first_name: yup.string().required(formRequiredMessage("First Name")),
	middle_name: yup.string(),
	last_name: yup.string().required(formRequiredMessage("Last Name")),
	username: yup.string().required(formRequiredMessage("Username")),
	email: yup.string().email().required(formRequiredMessage("Email")),
	password: yup.string().required(formRequiredMessage("Password")).min(8),
	confirm_password: yup
		.string()
		.is([yup.ref("password"), null], "Password doesn't match")
		.required(formRequiredMessage("Confirm Password")),
});

export const useSignupForm = (role: Role) => {
	const { toggleOn, toggleState } = useToggle();
	const Navigate = useNavigate();
	const { handleChange, handleSubmit, values, errors, isSubmitting } =
		useFormik({
			initialValues: {
				first_name: "",
				middle_name: "",
				last_name: "",
				username: "",
				email: "",
				password: "",
				confirm_password: "",
			},
			enableReinitialize: true,
			validateOnChange: toggleState,
			validateOnBlur: toggleState,
			validationSchema: SignupFormValidationSchema,
			onSubmit: (values, { setSubmitting }) => {
				userSignup({
					...values,
					role,
				})
					.then(() => Navigate("/login"))
					.catch(() => setSubmitting(false));
			},
		});

	const onSubmit = () => {
		toggleOn();
		handleSubmit();
	};

	return { onSubmit, handleChange, errors, values, isSubmitting };
};
