import axios from "axios";
import { Governorate } from "../constants/governorates";
import { IJobSearchResponse } from "../types/types";

export const jobSearch = async (
	searchValue: string,
	governorate: Governorate,
	remote: boolean,
	page: number
): Promise<IJobSearchResponse> => {
	let queryParams: any = {
		governorate,
		remote: remote ? "yes" : "no",
		page,
		limit: 10,
	};
	if (searchValue) {
		queryParams.query = searchValue;
	}
	return await axios
		.get<IJobSearchResponse>("/posts", {
			params: queryParams,
		})
		.then(({ data }) => {
			return data;
		})
		.catch((e) => e);
};
