import { AppState } from "../store/store";

export const selectLoggingOut = (state: AppState) => state.Logout.loggingOut;
