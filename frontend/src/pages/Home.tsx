import Headline from "../domain/Home/Headline/Headline";
import Services from "../domain/Home/Services/Services";
import RouteTransition from "../layouts/RouteTransition/RouteTransition";
import TabTitle from "../layouts/TabTitle/TabTitle";

const Home = () => {
	return (
		<>
			<TabTitle title="Homepage" />
			<RouteTransition>
				<Headline />
				<Services />
			</RouteTransition>
		</>
	);
};

export default Home;
