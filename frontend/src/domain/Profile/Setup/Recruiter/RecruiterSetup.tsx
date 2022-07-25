import RouteTransition from "../../../../layouts/RouteTransition/RouteTransition";
import TabTitle from "../../../../layouts/TabTitle/TabTitle";
import RecruiterSetupForm from "./Form/RecruiterSetupForm";

type Props = {};

const RecruiterSetup = (props: Props) => {
	return (
		<>
			<TabTitle title="Setup Your Profile" />
			<RouteTransition>
				<RecruiterSetupForm />
			</RouteTransition>
		</>
	);
};

export default RecruiterSetup;
