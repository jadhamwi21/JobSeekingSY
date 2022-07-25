import { sendAccountActivationCode } from "../../../../api/account";
import Link from "../../../../components/Link/Link";

const ResendVerificationCode = () => {
	const resendVerificationCodeHandler = () => {
		sendAccountActivationCode();
	};
	return (
		<Link onClick={resendVerificationCodeHandler} size="B">
			Resend Activation Code
		</Link>
	);
};

export default ResendVerificationCode;
