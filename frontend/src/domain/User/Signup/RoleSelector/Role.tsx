import { useSignupContext } from "../../../../context/SignupContext/SignupContext";
import { useSignupPagesContext } from "../../../../pages/Signup";

import { Role as RoleType } from "../../../../types/types";
import { RoleCard, RoleIcon, RoleName } from "./Role.styles";

type Props = {
	roleName: NonNullable<RoleType>;
	roleIcon: string;
};

const Role = ({ roleName, roleIcon }: Props) => {
	const { setRole } = useSignupContext();
	const { goToNextPage } = useSignupPagesContext();
	return (
		<RoleCard
			onClick={() => {
				setRole(roleName);
				goToNextPage();
			}}
		>
			<RoleIcon src={roleIcon} preview={false} height="100px" width="100px" />
			<RoleName>{roleName}</RoleName>
		</RoleCard>
	);
};

export default Role;
