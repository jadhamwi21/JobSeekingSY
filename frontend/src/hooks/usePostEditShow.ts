import { selectPostToEdit } from "../redux/selectors/postSelectors";
import { useAppSelector } from "../redux/store/store";
import { isNull } from "../utils/utils";

export const usePostEditShow = () => {
	const shouldShowPostEdit = !isNull(useAppSelector(selectPostToEdit));

	return shouldShowPostEdit;
};
