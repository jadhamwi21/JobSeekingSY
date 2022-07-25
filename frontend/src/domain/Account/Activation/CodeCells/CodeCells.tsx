import React from "react";

import CodeCell from "./CodeCell/CodeCell";
import { useCodeCellsRefs } from "./CodeCells.func";
import { CodeCellsContainer } from "./CodeCells.styles";

const CodeCells = () => {
	const [Cell0Ref, Cell1Ref, Cell2Ref, Cell3Ref] = useCodeCellsRefs();

	return (
		<CodeCellsContainer>
			<CodeCell
				cellNumber={0}
				cellRef={Cell0Ref}
				prevCellRef={null}
				nextCellRef={Cell1Ref}
			/>
			<CodeCell
				cellNumber={1}
				cellRef={Cell1Ref}
				prevCellRef={Cell0Ref}
				nextCellRef={Cell2Ref}
			/>
			<CodeCell
				cellNumber={2}
				cellRef={Cell2Ref}
				prevCellRef={Cell1Ref}
				nextCellRef={Cell3Ref}
			/>
			<CodeCell
				cellNumber={3}
				cellRef={Cell3Ref}
				prevCellRef={Cell2Ref}
				nextCellRef={null}
			/>
		</CodeCellsContainer>
	);
};

export default CodeCells;
