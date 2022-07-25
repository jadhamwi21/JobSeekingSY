import { InputRef } from "antd";
import React from "react";
import { useAccountActivationContext } from "../../../../../context/AccountActivationContext/AccountActivationContext";
import { conditionallyMoveBetweenCodeCells } from "./CodeCell.func";
import { CodeCellContainer, CodeCellInput } from "./CodeCell.styles";

type Props = {
	cellNumber: number;
	cellRef: React.RefObject<InputRef>;
	prevCellRef: React.RefObject<InputRef> | null;
	nextCellRef: React.RefObject<InputRef> | null;
};

const CodeCell = ({ cellNumber, cellRef, nextCellRef, prevCellRef }: Props) => {
	const { cells, onChangeHandlerGenerator } = useAccountActivationContext();
	const onChangeHandler = onChangeHandlerGenerator(cellNumber);
	return (
		<CodeCellContainer>
			<CodeCellInput
				value={cells[cellNumber]}
				filled={cells[cellNumber] !== "" ? 1 : 0}
				maxLength={1}
				onChange={(e) => {
					onChangeHandler(e);
					conditionallyMoveBetweenCodeCells(e, { prevCellRef, nextCellRef });
				}}
				ref={cellRef}
			/>
		</CodeCellContainer>
	);
};

export default CodeCell;
