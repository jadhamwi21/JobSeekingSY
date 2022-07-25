import { Governorate } from "../../../constants/governorates";
import { IPost } from "../../../types/types";

export interface IJobSearchReducerState {
	loading: boolean;
	posts: IPost[] | null;
	queryFields: {
		governorate: Governorate;
		remote: boolean;
		searchValue: string;
	};
	totalPosts: number;
}

export interface IJobSearchResults {
	jobs: IPost[] | null;
}
