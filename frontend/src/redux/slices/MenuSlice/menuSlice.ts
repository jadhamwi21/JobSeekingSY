import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setMenuSelectedItemThunk } from "../../thunks/menuThunk";
import { IMenuReducerState, MenuItemType, MenuStatus } from "./menuSlice.types";

const initialState: IMenuReducerState = {
	status: "closed",
	selectedItem: null,
};

export const menuSlice = createSlice({
	initialState,
	name: "menu",
	reducers: {
		toggleMenuStatus: (state: IMenuReducerState) => {
			if (state.status === "closed") {
				state.status = "open";
			} else {
				state.status = "closed";
			}
		},
		setMenuStatus: (
			state: IMenuReducerState,
			{ payload: status }: PayloadAction<MenuStatus>
		) => {
			state.status = status;
		},
		resetMenuSlice: () => initialState,
	},
	extraReducers(builder) {
		builder.addCase(
			setMenuSelectedItemThunk.fulfilled,
			(state, { payload: menuItem }: PayloadAction<MenuItemType | null>) => {
				state.selectedItem = menuItem;
			}
		);
	},
});

export const { toggleMenuStatus, setMenuStatus, resetMenuSlice } =
	menuSlice.actions;

export const MenuReducer = menuSlice.reducer;
