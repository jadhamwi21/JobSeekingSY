import React, { useContext } from "react";

type ProviderProps<ContextValue> = {
	children: React.ReactNode;
	value: ContextValue;
};

interface PagesIteratorContextInterface {
	goToNextPage: () => void;
	goToPreviousPage: () => void;
}

export const GeneratePagesIteratorContext = (): [
	() => PagesIteratorContextInterface,
	({
		children,
		value,
	}: ProviderProps<PagesIteratorContextInterface>) => JSX.Element
] => {
	const PagesIteratorContext =
		React.createContext<PagesIteratorContextInterface>({
			goToNextPage: () => {},
			goToPreviousPage: () => {},
		});
	const PagesIteratorContextProvider = ({
		children,
		value,
	}: ProviderProps<PagesIteratorContextInterface>) => {
		return (
			<PagesIteratorContext.Provider value={value}>
				{children}
			</PagesIteratorContext.Provider>
		);
	};

	const usePagesIteratorContext = () => useContext(PagesIteratorContext);

	return [usePagesIteratorContext, PagesIteratorContextProvider];
};
