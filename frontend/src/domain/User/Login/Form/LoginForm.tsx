import { Form, Input } from "antd";
import Button from "../../../../components/Button/Button";
import Link from "../../../../components/Link/Link";
import { getValidateStatus } from "../../../../utils/utils";
import { useLoginForm } from "./LoginForm.func";
import { LoginFormContainer, LoginFormWrapper } from "./LoginForm.styles";

const LoginForm = () => {
	const { onSubmit, handleChange, values, errors, isSubmitting } =
		useLoginForm();
	return (
		<LoginFormContainer>
			<LoginFormWrapper layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="Username / Email"
					validateStatus={getValidateStatus(errors.username_or_email)}
					help={errors.username_or_email}
				>
					<Input
						name="username_or_email"
						onChange={handleChange}
						value={values.username_or_email}
						autoComplete="off"
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					validateStatus={getValidateStatus(errors.password)}
					help={errors.password}
				>
					<Input
						type="password"
						name="password"
						onChange={handleChange}
						value={values.password}
						autoComplete="off"
					/>
				</Form.Item>

				<Form.Item>
					<Button buttonType="submit" center isSubmitting={isSubmitting}>
						Login
					</Button>
				</Form.Item>
				<Link to="/signup" size="C" center>
					not a member? sign up now
				</Link>
			</LoginFormWrapper>
		</LoginFormContainer>
	);
};

export default LoginForm;
