import { selectPostToViewId } from "../redux/selectors/postSelectors";
import { useAppSelector } from "../redux/store/store";
import { isNull } from "../utils/utils";

export const usePostViewShow = () => {
	const shouldShowPostView = !isNull(useAppSelector(selectPostToViewId));

	return shouldShowPostView;
};
