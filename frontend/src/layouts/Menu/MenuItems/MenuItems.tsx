import { useMemo } from "react";
import { selectMenuSelectedItem } from "../../../redux/selectors/menuSelectors";
import { selectRole } from "../../../redux/selectors/userSelectors";
import { finishedLoggingOut } from "../../../redux/slices/LogoutSlice/logoutSlice";
import {
	MenuItemType,
	RecruiterMenuItem,
	SeekerMenuItem,
} from "../../../redux/slices/MenuSlice/menuSlice.types";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";
import { setMenuSelectedItemThunk } from "../../../redux/thunks/menuThunk";
import { userLogoutThunk } from "../../../redux/thunks/userThunks";
import { shortDelay } from "../../../utils/utils";
import { MenuItem, MenuItemsFlexbox } from "./MenuItems.styles";

type Props = {};

const SeekerMenuItems: SeekerMenuItem[] = [
	"Seek",
	"Saved Posts",
	"Profile",
	"Logout",
];

const RecruiterMenuItems: RecruiterMenuItem[] = [
	"My Posts",
	"Create A New Post",
	"Find Seeker",
	"Profile",
	"Logout",
];

const MenuItems = (props: Props) => {
	const role = useAppSelector(selectRole);
	const Dispatch = useAppDispatch();
	const selectedItem = useAppSelector(selectMenuSelectedItem);
	const menuItemClickHandler = async (menuItem: MenuItemType) => {
		if (menuItem === "Logout") {
			await Dispatch(userLogoutThunk());
			await shortDelay(2);

			Dispatch(finishedLoggingOut());
		} else {
			Dispatch(setMenuSelectedItemThunk(menuItem));
		}
	};
	const menuItems = useMemo(() => {
		if (role === "Seeker") {
			return SeekerMenuItems;
		} else {
			return RecruiterMenuItems;
		}
	}, [role]);
	return (
		<MenuItemsFlexbox>
			{menuItems.map((menuItem) => (
				<MenuItem
					onClick={() => {
						menuItemClickHandler(menuItem);
					}}
					key={menuItem}
					selected={selectedItem === menuItem}
				>
					{menuItem}
				</MenuItem>
			))}
		</MenuItemsFlexbox>
	);
};

export default MenuItems;
