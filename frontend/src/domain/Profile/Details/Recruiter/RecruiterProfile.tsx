import { AnimatePresence, motion } from "framer-motion";
import LoadingIndicator from "../../../../components/LoadingIndicator/LoadingIndicator";
import { TransitionProps } from "../../../../constants/constants";
import { useToggle } from "../../../../hooks/useToggle";
import { selectUserProfileLoading } from "../../../../redux/selectors/profileSelectors";
import { useAppSelector } from "../../../../redux/store/store";
import RecruiterProfileDetails from "./RecruiterProfileDetails";
import RecruiterProfileEdit from "./RecruiterProfileEdit";

type Props = {};

const RecruiterProfile = (props: Props) => {
	const { toggle, toggleState } = useToggle();
	const profileLoading = useAppSelector(selectUserProfileLoading);
	return profileLoading ? (
		<LoadingIndicator height="90vh" />
	) : (
		<AnimatePresence exitBeforeEnter>
			<motion.div {...TransitionProps} key={toggleState ? 1 : 0}>
				{toggleState ? (
					<RecruiterProfileEdit toggleEdit={toggle} />
				) : (
					<RecruiterProfileDetails toggleEdit={toggle} />
				)}
			</motion.div>
		</AnimatePresence>
	);
};

export default RecruiterProfile;
