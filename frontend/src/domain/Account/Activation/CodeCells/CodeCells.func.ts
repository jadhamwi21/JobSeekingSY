import { InputRef } from "antd";
import { useRef } from "react";

export const useCodeCellsRefs = () => {
	const Cell0Ref = useRef<InputRef>(null);
	const Cell1Ref = useRef<InputRef>(null);
	const Cell2Ref = useRef<InputRef>(null);
	const Cell3Ref = useRef<InputRef>(null);

	return [Cell0Ref, Cell1Ref, Cell2Ref, Cell3Ref];
};
