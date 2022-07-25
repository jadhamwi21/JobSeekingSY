import RecruiterRoleIcon from "../../../../assets/icons/RecruiterRoleIcon.png";
import SeekerRoleIcon from "../../../../assets/icons/SeekerRoleIcon.png";
import Role from "./Role";
import {
	RolesContainer,
	RoleSelectorContainer,
	RoleSelectorHeading,
} from "./RoleSelector.styles";

const RoleSelector = () => {
	return (
		<RoleSelectorContainer>
			<RoleSelectorHeading>Sign up As</RoleSelectorHeading>
			<RolesContainer>
				<Role roleName={"Seeker"} roleIcon={SeekerRoleIcon} />
				<Role roleName={"Recruiter"} roleIcon={RecruiterRoleIcon} />
			</RolesContainer>
		</RoleSelectorContainer>
	);
};

export default RoleSelector;
