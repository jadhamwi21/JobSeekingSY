import { setCompanyName } from "../../redux/slices/CompanySlice/companySlice";
import { setPostToView } from "../../redux/slices/PostSlice/postSlice";
import { useAppDispatch } from "../../redux/store/store";
import Link from "../Link/Link";
import { PostViewNavigationWrapper } from "./PageNavigation.styles";

type Props = {
	children?: React.ReactNode;
	page?: "Company" | "Post";
	onClick?: Function;
};

const PageNavigation = ({ children, page, onClick }: Props) => {
	const Dispatch = useAppDispatch();

	return (
		<PostViewNavigationWrapper>
			<Link
				onClick={() => {
					if (page === "Company") {
						Dispatch(setCompanyName(null));
					}
					if (page === "Post") {
						Dispatch(setPostToView(null));
					}
					if (onClick) {
						onClick();
					}
				}}
				size="B"
			>
				Back
			</Link>

			{children}
		</PostViewNavigationWrapper>
	);
};

export default PageNavigation;
