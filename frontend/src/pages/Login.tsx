import LoginForm from "../domain/User/Login/Form/LoginForm";
import RouteTransition from "../layouts/RouteTransition/RouteTransition";
import TabTitle from "../layouts/TabTitle/TabTitle";

const Login = () => {
	return (
		<>
			<TabTitle title="Log In" />
			<RouteTransition>
				<LoginForm />
			</RouteTransition>
		</>
	);
};

export default Login;
