import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCompanyName } from "../slices/CompanySlice/companySlice";
import { MenuItemType } from "../slices/MenuSlice/menuSlice.types";
import { setPostToView } from "../slices/PostSlice/postSlice";
import { AppState } from "../store/store";

export const setMenuSelectedItemThunk = createAsyncThunk<
	MenuItemType | null,
	MenuItemType | null,
	{ state: AppState; rejectWithValue: unknown }
>("menu/set", async (menuItem, { rejectWithValue, dispatch }) => {
	try {
		dispatch(setPostToView(null));
		dispatch(setCompanyName(null));

		return menuItem;
	} catch (e) {
		return rejectWithValue(e);
	}
});
