import Button from "../../../../components/Button/Button";
import { useAccountActivationContext } from "../../../../context/AccountActivationContext/AccountActivationContext";
import { useAccountVerification } from "./ActivateButton.func";

const VerifyButton = () => {
	const { cells } = useAccountActivationContext();
	const { isSubmitting, accountVerificationHandler } =
		useAccountVerification(cells);
	return (
		<Button
			buttonType="button"
			onClick={accountVerificationHandler}
			isSubmitting={isSubmitting}
			disabled={isSubmitting}
		>
			Verify
		</Button>
	);
};

export default VerifyButton;
