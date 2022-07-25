import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router";
import io from "socket.io-client";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import "./config/axios.config";
import { baseUrl } from "./constants/constants";
import { Governorates } from "./constants/governorates";
import { Professions } from "./constants/professions";
import { useTokenRefresh } from "./hooks/useTokenRefresh";
import Header from "./layouts/Header/Header";
import RouteTransition from "./layouts/RouteTransition/RouteTransition";
import AccountActivation from "./pages/AccountActivation";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup";
import Signup from "./pages/Signup";
import AuthenticatedUserRoute from "./routes/AuthenticatedUserRoute";
import VisitorRoute from "./routes/VisitorRoute";
import "./styles/animation.css";
import "./styles/antd.css";
import "./styles/global.css";

const App = () => {
	const Location = useLocation();
	const checkingRefreshState = useTokenRefresh();
	console.log(baseUrl);
	return (
		<AnimatePresence exitBeforeEnter>
			<Routes
				location={Location}
				key={Location.pathname + checkingRefreshState}
			>
				<Route
					element={
						<>
							<Header />
							<Outlet />
						</>
					}
				>
					{checkingRefreshState ? (
						<Route
							path="*"
							element={
								<RouteTransition>
									<LoadingIndicator height="90vh" />
								</RouteTransition>
							}
						/>
					) : (
						<>
							<Route element={<VisitorRoute />}>
								<Route index element={<Home />} />
								<Route path="login" element={<Login />} />
								<Route path="signup" element={<Signup />} />
							</Route>
							<Route element={<AuthenticatedUserRoute />}>
								<Route path="dashboard" element={<Dashboard />} />
								<Route path="account">
									<Route path="activate" element={<AccountActivation />} />
								</Route>
								<Route path="profile">
									<Route path="setup" element={<ProfileSetup />} />
								</Route>
							</Route>
						</>
					)}
				</Route>
			</Routes>
		</AnimatePresence>
	);
};

export default App;
