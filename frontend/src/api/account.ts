import axios from "axios";
import { CellsType } from "../context/AccountActivationContext/AccountActivationContext";

export const accountActivation = async (code: CellsType) => {
	const mergedCells = code.join("");

	return await axios
		.post("/activation/code/submission", {
			code: mergedCells,
		})
		.then(({ data }) => data);
};

export const getAccountActivation = async () => {
	return await axios.get("/activation").then(({ data }) => data);
};

export const sendAccountActivationCode = async () => {
	return await axios.post("/activation/code/delivery").then(({ data }) => data);
};
