import { setCompanyName } from "../../redux/slices/CompanySlice/companySlice";
import { useAppDispatch } from "../../redux/store/store";
import { IPost } from "../../types/types";
import { formatSalary } from "../../utils/utils";
import Link from "../Link/Link";
import {
	CompanyName,
	Governorate,
	JobTitle,
	Remote,
	Salary,
} from "./PostOverview.styles";

type Props = {
	post: Pick<
		IPost,
		"company_name" | "id" | "title" | "governorate" | "remote" | "salary"
	>;
};

const PostOverview = ({ post }: Props) => {
	const Dispatch = useAppDispatch();
	return (
		<>
			<JobTitle>{post.title}</JobTitle>
			<Link
				size="B"
				onClick={() => {
					Dispatch(setCompanyName(post.company_name));
				}}
			>
				{post.company_name}
			</Link>
			<Governorate>{post.governorate}</Governorate>
			{post.remote && <Remote>Remote</Remote>}
			<Salary>{formatSalary(post.salary)}</Salary>
		</>
	);
};

export default PostOverview;
