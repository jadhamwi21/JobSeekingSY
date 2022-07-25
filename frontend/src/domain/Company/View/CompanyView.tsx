import LoadingIndicator from "../../../components/LoadingIndicator/LoadingIndicator";
import PageNavigation from "../../../components/PageNavigation/PageNavigation";
import useScrollToTop from "../../../hooks/useScrollToTop";
import TabTitle from "../../../layouts/TabTitle/TabTitle";
import CompanyPosts from "./CompanyPosts/CompanyPosts";
import CompanyProfile from "./CompanyProfile/CompanyProfile";
import CompanyRecruiter from "./CompanyRecruiter/CompanyRecruiter";
import { useCompanyView } from "./CompanyView.func";

type Props = {};

export const CompanyView = (props: Props) => {
	const { loading, company, posts, recruiter } = useCompanyView();
	useScrollToTop();
	return loading ? (
		<LoadingIndicator height="90vh" />
	) : (
		<>
			<TabTitle title={"Company Page"} />
			<PageNavigation page="Company" />
			<CompanyProfile company={company!} />
			<CompanyPosts posts={posts!} />
			<CompanyRecruiter recruiter={recruiter!} />
		</>
	);
};

export default CompanyView;
