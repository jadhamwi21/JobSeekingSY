import { accountActivation } from "../../../../api/account";
import { userRefreshToken } from "../../../../api/user";
import { CellsType } from "../../../../context/AccountActivationContext/AccountActivationContext";
import { useToggle } from "../../../../hooks/useToggle";

export const useAccountVerification = (cells: CellsType) => {
	const { toggle, toggleState } = useToggle();
	const accountVerificationHandler = () => {
		toggle();
		const _cells: CellsType = cells.map((cell) =>
			cell.toUpperCase()
		) as CellsType;
		accountActivation(_cells).then(userRefreshToken).catch(toggle);
	};

	return { accountVerificationHandler, isSubmitting: toggleState };
};
