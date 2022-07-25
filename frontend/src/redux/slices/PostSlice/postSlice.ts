import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../../types/types";
import { IPostReducerState } from "./postSlice.types";

const initialState: IPostReducerState = {
	postToViewId: null,
	postToEdit: null,
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setPostToView: (
			state: IPostReducerState,
			{ payload: viewedPost }: PayloadAction<string | null>
		) => {
			state.postToViewId = viewedPost;
		},
		setPostToEdit: (
			state: IPostReducerState,
			{ payload: post }: PayloadAction<IPost | null>
		) => {
			state.postToEdit = post;
		},
		resetPostSlice: () => initialState,
	},
});

export const { setPostToView, setPostToEdit, resetPostSlice } =
	postSlice.actions;
export const PostReducer = postSlice.reducer;
