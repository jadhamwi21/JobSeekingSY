import { useEffect, useState } from "react";
import { getCompanyPosts } from "../../../api/post";
import { getCompanyProfile, getUserProfileDetails } from "../../../api/profile";
import { selectCompanyName } from "../../../redux/selectors/companySelectors";
import { useAppSelector } from "../../../redux/store/store";
import { ICompany, IPost, IRecruiter } from "../../../types/types";

export const useCompanyView = () => {
	const company_name = useAppSelector(selectCompanyName)!;
	const [loading, setLoading] = useState(true);
	const [company, setCompany] = useState<ICompany | null>(null);
	const [posts, setPosts] = useState<IPost[] | null>(null);
	const [recruiter, setRecruiter] = useState<any>(null);
	useEffect(() => {
		Promise.all([
			getCompanyProfile.bind(null, company_name)(),
			getCompanyPosts.bind(null, company_name)(),
		]).then(([companyProfileRes, companyPostsRes]) => {
			const { companyProfile: company } = companyProfileRes;
			const { posts: companyPosts } = companyPostsRes;
			setPosts(companyPosts);
			setCompany(company);
		});
	}, []);

	useEffect(() => {
		if (posts) {
			const getRecruiter = async () => {
				const { details: recruiterDetails } = await getUserProfileDetails(
					posts[0].posted_by!
				);
				setRecruiter(recruiterDetails);
				setLoading(false);
			};
			getRecruiter();
		}
	}, [posts]);

	return { loading, company, posts, recruiter };
};
