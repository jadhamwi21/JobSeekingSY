import { InputRef } from "antd";
import React from "react";

export const conditionallyMoveBetweenCodeCells = (
	e: React.ChangeEvent<HTMLInputElement>,
	{
		prevCellRef,
		nextCellRef,
	}: {
		prevCellRef: React.RefObject<InputRef> | null;
		nextCellRef: React.RefObject<InputRef> | null;
	}
) => {
	if (e.target.value.length === e.target.maxLength) {
		if (nextCellRef?.current?.input?.value === "") {
			nextCellRef?.current?.focus();
		}
	} else {
		if (prevCellRef?.current?.input?.value === "") {
			prevCellRef?.current?.focus();
		}
	}
};
