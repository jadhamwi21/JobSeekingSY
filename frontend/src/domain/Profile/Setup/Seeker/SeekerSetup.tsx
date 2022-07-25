import RouteTransition from "../../../../layouts/RouteTransition/RouteTransition";
import TabTitle from "../../../../layouts/TabTitle/TabTitle";
import SeekerSetupForm from "./Form/SeekerSetupForm";

type Props = {};

const SeekerSetup = (props: Props) => {
	return (
		<>
			<TabTitle title="Setup Your Profile" />
			<RouteTransition>
				<SeekerSetupForm />
			</RouteTransition>
		</>
	);
};

export default SeekerSetup;
