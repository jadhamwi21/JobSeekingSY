import { AppState } from "../store/store";

export const selectPostToViewId = (state: AppState) => state.Post.postToViewId;

export const selectPostToEdit = (state: AppState) => state.Post.postToEdit;

export const selectPostState = (state: AppState) => state.Post;
