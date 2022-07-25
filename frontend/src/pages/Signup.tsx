import { AnimatePresence, motion } from "framer-motion";
import { GeneratePagesIteratorContext } from "../context/ContextGenerators";
import { SignupContextProvider } from "../context/SignupContext/SignupContext";
import SignupForm from "../domain/User/Signup/Form/SignupForm";
import RoleSelector from "../domain/User/Signup/RoleSelector/RoleSelector";
import { usePagesIterator } from "../hooks/usePagesIterator";
import RouteTransition from "../layouts/RouteTransition/RouteTransition";
import TabTitle from "../layouts/TabTitle/TabTitle";

enum SignupPageType {
	RoleSelector,
	SignupForm,
}

const signupPagesArray = [
	SignupPageType.RoleSelector,
	SignupPageType.SignupForm,
];

const RenderSignupPage = (page: SignupPageType) => {
	if (page === SignupPageType.RoleSelector) {
		return <RoleSelector />;
	} else {
		return <SignupForm />;
	}
};

export const [useSignupPagesContext, SignupPagesContextProvider] =
	GeneratePagesIteratorContext();

const Signup = () => {
	const { page, goToNextPage, goToPreviousPage } =
		usePagesIterator<SignupPageType>(signupPagesArray);
	return (
		<SignupPagesContextProvider value={{ goToNextPage, goToPreviousPage }}>
			<SignupContextProvider>
				<TabTitle title="Create New Account" />
				<RouteTransition>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key={page}
						>
							{RenderSignupPage(page)}
						</motion.div>
					</AnimatePresence>
				</RouteTransition>
			</SignupContextProvider>
		</SignupPagesContextProvider>
	);
};

export default Signup;
