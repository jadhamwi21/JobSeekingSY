import { AppState } from "../store/store";

export const selectMenuStatus = (state: AppState) => state.Menu.status;
export const selectMenuSelectedItem = (state: AppState) =>
	state.Menu.selectedItem;

export const selectMenuState = (state: AppState) => state.Menu;
