import { Form, Input, Select, Switch } from "antd";
import { useEffect } from "react";
import Button from "../../../../components/Button/Button";
import { Governorates } from "../../../../constants/governorates";
import { selectJobSearchQueryFields } from "../../../../redux/selectors/jobSearchSelectors";
import { selectUserProfileState } from "../../../../redux/selectors/profileSelectors";
import {
	setGovernorate,
	setRemote,
	setSearchValue,
} from "../../../../redux/slices/JobSearchSlice/jobSearchSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/store";
import { JobSearchFormContainer } from "./JobSearchForm.styles";

type Props = {};

const JobSearchForm = (props: Props) => {
	const Dispatch = useAppDispatch();
	const { searchValue, governorate, remote } = useAppSelector(
		selectJobSearchQueryFields
	);

	return (
		<JobSearchFormContainer layout="vertical">
			<Form.Item label="Search For">
				<Input
					onChange={(e) => Dispatch(setSearchValue(e.target.value))}
					value={searchValue}
				/>
			</Form.Item>
			<Form.Item label="Governorate">
				<Select
					onChange={(gov) => Dispatch(setGovernorate(gov))}
					value={governorate}
				>
					{Governorates.map((governorate) => (
						<Select.Option value={governorate} key={governorate}>
							{governorate}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Remote">
				<Switch
					checked={remote}
					onChange={(remote) => Dispatch(setRemote(remote))}
				/>
			</Form.Item>
		</JobSearchFormContainer>
	);
};

export default JobSearchForm;
