import React, { useContext, useState } from "react";
import { Role } from "../../types/types";

interface ISignupFormContext {
	role: Role;
	setRole: (role: Role) => void;
}

const SignupContext = React.createContext<ISignupFormContext>({
	role: null,
	setRole: () => {},
});

type Props = {
	children: React.ReactNode;
};

const SignupContextProvider = ({ children }: Props) => {
	const [role, setRole] = useState<Role>(null);
	return (
		<SignupContext.Provider value={{ role, setRole }}>
			{children}
		</SignupContext.Provider>
	);
};

const useSignupContext = () => useContext(SignupContext);

export { useSignupContext, SignupContextProvider };
