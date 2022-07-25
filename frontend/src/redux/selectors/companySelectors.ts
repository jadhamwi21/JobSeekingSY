import { AppState } from "../store/store";

export const selectCompanyName = (state: AppState) =>
	state.Company.company_name;
