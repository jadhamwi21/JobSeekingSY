import { Form, Input } from "antd";
import Button from "../../../../components/Button/Button";
import Link from "../../../../components/Link/Link";
import { useSignupContext } from "../../../../context/SignupContext/SignupContext";
import { getValidateStatus } from "../../../../utils/utils";
import { useSignupForm } from "./SignupForm.func";
import { SignupFormContainer, SignupFormWrapper } from "./SignupForm.styles";

const SignupForm = () => {
	const { role } = useSignupContext();
	const { handleChange, onSubmit, values, errors, isSubmitting } =
		useSignupForm(role);
	return (
		<SignupFormContainer>
			<SignupFormWrapper layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="First Name"
					required={true}
					validateStatus={getValidateStatus(errors.first_name)}
					help={errors.first_name}
				>
					<Input
						onChange={handleChange}
						name="first_name"
						value={values.first_name}
					/>
				</Form.Item>
				<Form.Item
					label="Middle Name"
					validateStatus={getValidateStatus(errors.middle_name)}
					help={errors.middle_name}
				>
					<Input
						onChange={handleChange}
						name="middle_name"
						value={values.middle_name}
					/>
				</Form.Item>
				<Form.Item
					label="Last Name"
					required={true}
					validateStatus={getValidateStatus(errors.last_name)}
					help={errors.last_name}
				>
					<Input
						onChange={handleChange}
						name="last_name"
						value={values.last_name}
					/>
				</Form.Item>
				<Form.Item
					label="Username"
					required={true}
					validateStatus={getValidateStatus(errors.username)}
					help={errors.username}
				>
					<Input
						onChange={handleChange}
						name="username"
						value={values.username}
					/>
				</Form.Item>
				<Form.Item
					label="Email"
					required={true}
					validateStatus={getValidateStatus(errors.email)}
					help={errors.email}
				>
					<Input onChange={handleChange} name="email" value={values.email} />
				</Form.Item>
				<Form.Item
					label="Password"
					required={true}
					validateStatus={getValidateStatus(errors.password)}
					help={errors.password}
				>
					<Input.Password
						visibilityToggle={false}
						onChange={handleChange}
						name="password"
						value={values.password}
					/>
				</Form.Item>
				<Form.Item
					label="Confirm Password"
					required={true}
					validateStatus={getValidateStatus(errors.confirm_password)}
					help={errors.confirm_password}
				>
					<Input.Password
						visibilityToggle={false}
						onChange={handleChange}
						name="confirm_password"
						value={values.confirm_password}
					/>
				</Form.Item>
				<Form.Item>
					<Button buttonType="submit" center isSubmitting={isSubmitting}>
						Submit
					</Button>
				</Form.Item>
				<Link to="/login" size="C" center>
					already a member? login
				</Link>
			</SignupFormWrapper>
		</SignupFormContainer>
	);
};

export default SignupForm;
