import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CompanyReducer } from "../slices/CompanySlice/companySlice";
import { JobSearchReducer } from "../slices/JobSearchSlice/jobSearchSlice";
import { LogoutReducer } from "../slices/LogoutSlice/logoutSlice";
import { MenuReducer } from "../slices/MenuSlice/menuSlice";
import { PostReducer } from "../slices/PostSlice/postSlice";
import { ProfileReducer } from "../slices/ProfileSlice/profileSlice";
import { UserReducer } from "../slices/UserSlice/userSlice";

const rootReducer = combineReducers({
	Job: JobSearchReducer,
	User: UserReducer,
	Menu: MenuReducer,
	Post: PostReducer,
	Profile: ProfileReducer,
	Logout: LogoutReducer,
	Company: CompanyReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

type DispatchType = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<DispatchType>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
