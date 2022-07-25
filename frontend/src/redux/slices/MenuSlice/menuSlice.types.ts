export type SeekerMenuItem = "Seek" | "Profile" | "Saved Posts" | "Logout";
export type RecruiterMenuItem =
	| "My Posts"
	| "Create A New Post"
	| "Profile"
	| "Logout"
	| "Find Seeker";

export type MenuItemType = RecruiterMenuItem | SeekerMenuItem;

export type MenuStatus = "open" | "closed";

export interface IMenuReducerState {
	status: MenuStatus;
	selectedItem: MenuItemType | null;
}
