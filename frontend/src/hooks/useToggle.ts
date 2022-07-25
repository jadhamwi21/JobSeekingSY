import { useState } from "react";

export const useToggle = (initial?: boolean) => {
	const [toggleState, setToggleState] = useState(initial ? initial : false);
	const toggleOn = () => setToggleState(true);
	const toggleOff = () => setToggleState(false);
	const toggle = () => setToggleState((prevToggleState) => !prevToggleState);

	return { toggleOn, toggleOff, toggle, toggleState };
};
