import { Checkbox, Input, Select, Slider } from "antd";
import { Option } from "antd/lib/mentions";
import { useEffect } from "react";
import Button from "../../../components/Button/Button";
import Section from "../../../components/Section/Section";
import TextArea from "../../../components/TextArea/TextArea";
import {
	SalarySliderMarks,
	TransitionProps,
} from "../../../constants/constants";
import { usePostForm } from "../../../hooks/usePostForm";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { setPostToEdit } from "../../../redux/slices/PostSlice/postSlice";
import { useAppDispatch } from "../../../redux/store/store";
import { getValidateStatus } from "../../../utils/utils";
import { motion } from "framer-motion";
import {
	FixedSalaryInput,
	FormItem,
	PostEditContainer,
	PostEditForm,
	PostEditTitle,
} from "./PostEdit.styles";

type Props = {};

const PostEdit = (props: Props) => {
	useScrollToTop();
	const { values, errors, handlers, onSubmit, salaryType, fixedSalaryValue } =
		usePostForm(true);
	const Dispatch = useAppDispatch();
	useEffect(() => {
		return () => {
			Dispatch(setPostToEdit(null));
		};
	}, []);
	return (
		<motion.div {...TransitionProps} key="PostEdit">
			<PostEditContainer>
				<PostEditTitle>Start Editing Your Post</PostEditTitle>
				<PostEditForm layout="horizontal" onFinish={onSubmit}>
					<Section title="Title">
						<FormItem
							ItemWidth="50%"
							validateStatus={getValidateStatus(errors.title)}
						>
							<Input
								value={values.title}
								onChange={handlers.titleChangeHandler}
							/>
						</FormItem>
					</Section>
					<Section title="Type">
						<FormItem
							ItemWidth="50%"
							validateStatus={getValidateStatus(errors.type)}
						>
							<Select onChange={handlers.typeChangeHandler} value={values.type}>
								<Option value="Full-Time">Full-Time</Option>
								<Option value="Part-Time">Part-Time</Option>
							</Select>
						</FormItem>
						<FormItem
							ItemWidth="50%"
							label="Remote"
							ItemPadding="1.5em 0px"
							validateStatus={getValidateStatus(errors.remote)}
						>
							<Checkbox
								onChange={handlers.remoteChangeHandler}
								checked={values.remote}
							/>
						</FormItem>
					</Section>
					<Section title="Salary">
						<FormItem
							ItemWidth="100%"
							ItemPadding="1em 0px"
							validateStatus={getValidateStatus(errors.salary)}
						>
							{salaryType === "Ranged" ? (
								<Slider
									marks={SalarySliderMarks}
									step={null}
									defaultValue={[20, 80]}
									range
									tooltipVisible={false}
									onChange={handlers.rangedSalaryChangeHandler}
								/>
							) : (
								<FormItem ItemWidth="20%">
									<FixedSalaryInput
										onChange={handlers.fixedSalaryChangeHandler}
										min={0}
										value={fixedSalaryValue}
										onBlur={handlers.fixedSalaryBlurHandler}
									/>
								</FormItem>
							)}
						</FormItem>
						<FormItem ItemWidth="20%">
							<Select
								onChange={handlers.selectSalaryTypeHandler}
								value={salaryType}
							>
								<Option value="Ranged">Ranged</Option>
								<Option value="Fixed">Fixed</Option>
							</Select>
						</FormItem>
					</Section>
					<Section title="Description">
						<FormItem
							ItemWidth="80%"
							validateStatus={getValidateStatus(errors.description)}
						>
							<TextArea
								value={values.description}
								height="200px"
								onChange={handlers.descriptionChangeHandler}
							/>
						</FormItem>
					</Section>
					<Section title="Application Link">
						<FormItem
							ItemWidth="50%"
							validateStatus={getValidateStatus(errors.application_link)}
						>
							<Input
								value={values.application_link}
								onChange={handlers.applicationLinkChangeHandler}
							/>
						</FormItem>
					</Section>
					<FormItem ItemWidth="80%">
						<Button buttonType="submit" center>
							Save Edit
						</Button>
					</FormItem>
				</PostEditForm>
			</PostEditContainer>
		</motion.div>
	);
};

export default PostEdit;
