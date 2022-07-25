import React, { useContext, useState } from "react";

export type CellsType = [string, string, string, string];

interface IAccountActivationContext {
	cells: CellsType;
	onChangeHandlerGenerator: (
		cellNumber: number
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountActivationContext = React.createContext<IAccountActivationContext>(
	{
		cells: ["", "", "", ""],
		onChangeHandlerGenerator: () => () => {},
	}
);

type Props = {
	children: React.ReactNode;
};

const AccountActivationContextProvider = ({ children }: Props) => {
	const [cells, setCells] = useState<CellsType>(["", "", "", ""]);
	const onChangeHandlerGenerator =
		(cellNumber: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const newCells: CellsType = [...cells];
			newCells[cellNumber] = e.target.value;
			setCells(newCells);
		};

	return (
		<AccountActivationContext.Provider
			value={{
				cells,
				onChangeHandlerGenerator,
			}}
		>
			{children}
		</AccountActivationContext.Provider>
	);
};

const useAccountActivationContext = () => useContext(AccountActivationContext);

export { useAccountActivationContext, AccountActivationContextProvider };
