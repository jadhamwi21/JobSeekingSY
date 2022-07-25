import { Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import LoadingIndicator from "../../../components/LoadingIndicator/LoadingIndicator";
import NoResult from "../../../components/NoResult/NoResult";
import { TransitionProps } from "../../../constants/constants";
import { isNull } from "../../../utils/utils";
import ProfileCard from "./ProfileCard/ProfileCard";
import { useProfileSearch } from "./ProfileSearch.func";
import {
	ProfileSearchContainer,
	ProfileSearchResultsContainer,
} from "./ProfileSearch.styles";

type Props = {};

const ProfileSearch = (props: Props) => {
	const { changeHandler, results, loading } = useProfileSearch();

	return (
		<ProfileSearchContainer>
			<Form layout="vertical">
				<Form.Item label="Search">
					<Input
						placeholder="Find a seeker"
						onChange={changeHandler}
						allowClear
					/>
				</Form.Item>
			</Form>
			<AnimatePresence exitBeforeEnter>
				<motion.div key={loading ? 1 : 0} {...TransitionProps}>
					{loading ? (
						<LoadingIndicator height="40vh" />
					) : !isNull(results) ? (
						results?.length === 0 ? (
							<NoResult content={"No Results Found"} />
						) : (
							<ProfileSearchResultsContainer>
								{results?.map((profile) => (
									<ProfileCard profile={profile} />
								))}
							</ProfileSearchResultsContainer>
						)
					) : null}
				</motion.div>
			</AnimatePresence>
		</ProfileSearchContainer>
	);
};

export default ProfileSearch;
