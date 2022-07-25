import { Navigate } from "react-router";
import {
	selectIsProfileSetup,
	selectRole,
} from "../redux/selectors/userSelectors";
import { useAppSelector } from "../redux/store/store";
import RecruiterSetup from "../domain/Profile/Setup/Recruiter/RecruiterSetup";
import SeekerSetup from "../domain/Profile/Setup/Seeker/SeekerSetup";

type Props = {};

const ProfileSetup = (props: Props) => {
	const role = useAppSelector(selectRole);
	const isProfileSetup = useAppSelector(selectIsProfileSetup);
	if (isProfileSetup) {
		return <Navigate replace to="/dashboard" />;
	} else {
		return role === "Seeker" ? <SeekerSetup /> : <RecruiterSetup />;
	}
};

export default ProfileSetup;
