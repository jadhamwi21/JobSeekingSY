import { AnimatePresence, motion } from "framer-motion";
import { TransitionProps } from "../../../constants/constants";
import Menu from "../../../layouts/Menu/Menu";
import { selectMenuSelectedItem } from "../../../redux/selectors/menuSelectors";
import { useAppSelector } from "../../../redux/store/store";
import PostCreate from "../../Post/Create/PostCreate";
import RecruiterPosts from "../../Post/Recruiter/RecruiterPosts";
import RecruiterProfile from "../../Profile/Details/Recruiter/RecruiterProfile";
import ProfileSearch from "../../Profile/Search/ProfileSearch";

type Props = {};

const RecruiterDashboard = (props: Props) => {
	const selectedMenuItem = useAppSelector(selectMenuSelectedItem);
	return (
		<>
			<Menu />
			<AnimatePresence exitBeforeEnter>
				<motion.div {...TransitionProps} key={selectedMenuItem}>
					{selectedMenuItem === "My Posts" && <RecruiterPosts />}
					{selectedMenuItem === "Create A New Post" && <PostCreate />}
					{selectedMenuItem === "Profile" && <RecruiterProfile />}
					{selectedMenuItem === "Find Seeker" && <ProfileSearch />}
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default RecruiterDashboard;
