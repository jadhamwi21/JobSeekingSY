import DefaultAvatarIcon from "../../assets/icons/DefaultAvatar.svg";
import { selectMenuStatus } from "../../redux/selectors/menuSelectors";
import { selectUserProfileState } from "../../redux/selectors/profileSelectors";
import { useAppSelector } from "../../redux/store/store";
import { getProfilePicturePath } from "../../utils/utils";
import MenuDetailsSkeleton from "../Skeletons/MenuDetailsSkeleton";
import FullName from "./FullName/FullName";
import { MenuContainer, MenuProfilePicture } from "./Menu.styles";
import MenuItems from "./MenuItems/MenuItems";

type Props = {};

const Menu = (props: Props) => {
	const menuStatus = useAppSelector(selectMenuStatus);

	const { loading, profile_picture, fullName } = useAppSelector(
		selectUserProfileState
	);
	return (
		<MenuContainer open={menuStatus === "open"}>
			{loading ? (
				<MenuDetailsSkeleton />
			) : (
				<>
					<MenuProfilePicture
						src={
							profile_picture
								? getProfilePicturePath(profile_picture)
								: DefaultAvatarIcon
						}
						preview={false}
					/>
					<FullName fullName={fullName!} />
				</>
			)}
			<MenuItems />
		</MenuContainer>
	);
};

export default Menu;
