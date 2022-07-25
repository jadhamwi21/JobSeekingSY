import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import { selectLoggingOut } from "../redux/selectors/logoutSelectors";
import { selectIsAuthenticated } from "../redux/selectors/userSelectors";
import { useAppSelector } from "../redux/store/store";

const AuthenticatedUserRoute = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const isLoggingOut = useAppSelector(selectLoggingOut);
	return (
		<>
			{isAuthenticated ? (
				<Outlet />
			) : isLoggingOut ? (
				<LoadingIndicator height="90vh" />
			) : (
				<Navigate to="/login" replace />
			)}
		</>
	);
};

export default AuthenticatedUserRoute;
