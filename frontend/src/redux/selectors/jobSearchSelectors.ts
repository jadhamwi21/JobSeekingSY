import { AppState } from "../store/store";

export const selectJobSearchLoading = (state: AppState) => state.Job.loading;
export const selectJobSearchPosts = (state: AppState) => state.Job.posts;

export const selectJobSearchQueryFields = (state: AppState) =>
	state.Job.queryFields;

export const selectTotalPosts = (state: AppState) => state.Job.totalPosts;

export const selectJobSearchState = (state: AppState) => state.Job;
