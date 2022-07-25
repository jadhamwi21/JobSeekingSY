import { AnimatePresence, motion } from "framer-motion";
import { TransitionProps } from "../../../constants/constants";
import Menu from "../../../layouts/Menu/Menu";
import { selectMenuSelectedItem } from "../../../redux/selectors/menuSelectors";
import { useAppSelector } from "../../../redux/store/store";

import JobSearch from "../../Job/Search/JobSearch";
import SavedPosts from "../../Post/Saved/SavedPosts";
import SeekerProfile from "../../Profile/Details/Seeker/SeekerProfile";

type Props = {};

const SeekerDashboard = (props: Props) => {
	const selectedMenuItem = useAppSelector(selectMenuSelectedItem);
	return (
		<>
			<Menu />
			<AnimatePresence exitBeforeEnter>
				<motion.div key={selectedMenuItem} {...TransitionProps}>
					<>
						{selectedMenuItem === "Seek" && <JobSearch />}
						{selectedMenuItem === "Saved Posts" && <SavedPosts />}
						{selectedMenuItem === "Profile" && <SeekerProfile />}
					</>
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default SeekerDashboard;
