import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { userRefreshToken } from "../api/user";
import { setAuthenticated } from "../redux/slices/UserSlice/userSlice";
import { useAppDispatch } from "../redux/store/store";

export const useTokenRefresh = () => {
	const [loading, setLoading] = useState(true);
	const Dispatch = useAppDispatch();
	const Navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			const silentRefresher = () => {
				const MINUTE = 60000;
				setInterval(() => {
					userRefreshToken();
				}, MINUTE * 45);
			};
			userRefreshToken()
				.then(() => {
					Navigate("/dashboard");
					Dispatch(setAuthenticated(true));
					silentRefresher();
				})
				.finally(() => {
					setLoading(false);
				});
		}, 2000);
	}, []);

	return loading;
};
