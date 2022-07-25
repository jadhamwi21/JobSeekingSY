import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import LoadingIndicator from "../../../../components/LoadingIndicator/LoadingIndicator";
import { TransitionProps } from "../../../../constants/constants";
import { useToggle } from "../../../../hooks/useToggle";
import { selectUserProfileLoading } from "../../../../redux/selectors/profileSelectors";
import { resetProfileSlice } from "../../../../redux/slices/ProfileSlice/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { getMyProfileDetailsThunk } from "../../../../redux/thunks/profileThunks";
import SeekerProfileDetails from "./SeekerProfileDetails";
import SeekerProfileEdit from "./SeekerProfileEdit";

type Props = {};

const SeekerProfile = (props: Props) => {
	const { toggle, toggleState } = useToggle();
	const profileLoading = useAppSelector(selectUserProfileLoading);

	return profileLoading ? (
		<LoadingIndicator height="90vh" />
	) : (
		<AnimatePresence exitBeforeEnter>
			<motion.div {...TransitionProps} key={toggleState ? 1 : 0}>
				{toggleState ? (
					<SeekerProfileEdit toggleEdit={toggle} />
				) : (
					<SeekerProfileDetails toggleEdit={toggle} />
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default SeekerProfile;
