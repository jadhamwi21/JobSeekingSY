import { selectCompanyName } from "../redux/selectors/companySelectors";
import { useAppSelector } from "../redux/store/store";
import { isNull } from "../utils/utils";

export const useCompanyViewShow = () => {
	const company_name = useAppSelector(selectCompanyName);

	return !isNull(company_name);
};
