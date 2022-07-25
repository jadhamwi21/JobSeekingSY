import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/selectors/userSelectors";
import { useAppSelector } from "../redux/store/store";

const VisitorRoute = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	return (
		<>{isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />}</>
	);
};

export default VisitorRoute;
