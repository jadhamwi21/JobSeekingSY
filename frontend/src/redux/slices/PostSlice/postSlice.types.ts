import { IPost } from "../../../types/types";

export interface IPostReducerState {
	postToViewId: string | null;
	postToEdit: IPost | null;
}
