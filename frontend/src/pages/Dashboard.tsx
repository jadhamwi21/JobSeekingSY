import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import RecruiterDashboard from "../domain/Dashboard/Recruiter/RecruiterDashboard";
import SeekerDashboard from "../domain/Dashboard/Seeker/SeekerDashboard";
import RouteTransition from "../layouts/RouteTransition/RouteTransition";
import TabTitle from "../layouts/TabTitle/TabTitle";
import {
	selectInitialLoading,
	selectIsAccountActivated,
	selectIsProfileSetup,
	selectRole,
} from "../redux/selectors/userSelectors";
import { setInitialLoading } from "../redux/slices/UserSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { getMyProfileDetailsThunk } from "../redux/thunks/profileThunks";
import {
	userIsAccountActivatedThunk,
	userProfileIsSetupThunk,
} from "../redux/thunks/userThunks";
import { Role } from "../types/types";
import { shortDelay } from "../utils/utils";

type Props = {};

const DashboardRender = (role: Role) => {
	if (role === "Recruiter") {
		return <RecruiterDashboard />;
	} else {
		return <SeekerDashboard />;
	}
};

const Dashboard = (props: Props) => {
	const isAccountActivated = useAppSelector(selectIsAccountActivated);
	const isProfileSetup = useAppSelector(selectIsProfileSetup);
	const role = useAppSelector(selectRole);
	const initialLoading = useAppSelector(selectInitialLoading);
	const Dispatch = useAppDispatch();
	useEffect(() => {
		Promise.all([
			Dispatch(userProfileIsSetupThunk()),
			Dispatch(userIsAccountActivatedThunk()),
		]).then(() => {
			Dispatch(setInitialLoading(false));
		});
	}, []);
	useEffect(() => {
		if (isProfileSetup && isAccountActivated)
			Dispatch(getMyProfileDetailsThunk());
	}, [isProfileSetup, isAccountActivated]);
	return (
		<>
			<TabTitle title="Your Dashboard" />
			{initialLoading ? (
				<LoadingIndicator height={"90vh"} />
			) : isAccountActivated ? (
				isProfileSetup ? (
					<RouteTransition>{DashboardRender(role)}</RouteTransition>
				) : (
					<Navigate replace to="/profile/setup" />
				)
			) : (
				<Navigate replace to="/account/activate" />
			)}
		</>
	);
};

export default Dashboard;
