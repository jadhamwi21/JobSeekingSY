import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanySliceState } from "./companySlice.types";

const initialState: ICompanySliceState = {
	company_name: null,
};

const companySlice = createSlice({
	name: "company",
	initialState,
	reducers: {
		setCompanyName: (
			state: ICompanySliceState,
			{ payload: companyName }: PayloadAction<string | null>
		) => {
			state.company_name = companyName;
		},
		resetCompanySlice: () => initialState,
	},
});

export const { setCompanyName, resetCompanySlice } = companySlice.actions;

export const CompanyReducer = companySlice.reducer;
