import { Image } from "antd";
import { useNavigate } from "react-router";
import AppLogo from "../../assets/icons/AppIcon.png";
import Link from "../../components/Link/Link";
import MenuToggler from "../../components/MenuToggler/MenuToggler";
import { selectMenuSelectedItem } from "../../redux/selectors/menuSelectors";
import {
	selectIsAccountActivated,
	selectIsAuthenticated,
	selectIsProfileSetup,
} from "../../redux/selectors/userSelectors";
import { finishedLoggingOut } from "../../redux/slices/LogoutSlice/logoutSlice";
import { setInitialLoading } from "../../redux/slices/UserSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { userLogoutThunk } from "../../redux/thunks/userThunks";
import { shortDelay } from "../../utils/utils";
import {
	AppTitle,
	HeaderContainer,
	HeaderElementsWrapper,
} from "./Header.styles";

const Header = () => {
	const Navigate = useNavigate();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const isAccountActivated = useAppSelector(selectIsAccountActivated);
	const isProfileSetup = useAppSelector(selectIsProfileSetup);
	const shouldShowMenuToggler =
		isAuthenticated && isAccountActivated && isProfileSetup;
	const shouldShowLogout =
		isAuthenticated && !isAccountActivated && !isProfileSetup;
	const Dispatch = useAppDispatch();
	return (
		<HeaderContainer>
			<HeaderElementsWrapper
				onClick={() => {
					if (!isAuthenticated) {
						Navigate("/");
					}
				}}
			>
				<Image src={AppLogo} preview={false} height="50px" width="50px" />
				<AppTitle>JobSeekingSY</AppTitle>
			</HeaderElementsWrapper>
			{shouldShowMenuToggler && <MenuToggler />}
			{shouldShowLogout && (
				<Link
					onClick={async () => {
						await Dispatch(userLogoutThunk());
						await shortDelay(2);

						Dispatch(finishedLoggingOut());
					}}
					size="B"
				>
					Logout
				</Link>
			)}
		</HeaderContainer>
	);
};

export default Header;
