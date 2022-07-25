import { AccountActivationContextProvider } from "../../../../context/AccountActivationContext/AccountActivationContext";
import { AccountActivationFormContainner } from "./AccountActivationForm.styles";
import CodeCells from "../CodeCells/CodeCells";
import ActivateButton from "../ActivateButton/ActivateButton";

const AccountVerificationForm = () => {
	return (
		<AccountActivationContextProvider>
			<AccountActivationFormContainner>
				<CodeCells />
				<ActivateButton />
			</AccountActivationFormContainner>
		</AccountActivationContextProvider>
	);
};

export default AccountVerificationForm;
