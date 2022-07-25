import React from "react";
import UseAnimations from "react-useanimations";
import Menu from "react-useanimations/lib/menu2";
import { toggleMenuStatus } from "../../redux/slices/MenuSlice/menuSlice";
import { useAppDispatch } from "../../redux/store/store";
import { MenuTogglerWrapper } from "./MenuToggler.styles";
type Props = {};

const MenuToggler = (props: Props) => {
	const Dispatch = useAppDispatch();
	return (
		<MenuTogglerWrapper>
			<UseAnimations
				animation={Menu}
				size={40}
				speed={2.5}
				onClick={() => {
					Dispatch(toggleMenuStatus());
				}}
				strokeColor="var(--blue)"
			/>
		</MenuTogglerWrapper>
	);
};

export default MenuToggler;
