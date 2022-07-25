import { Modal } from "antd";
import { CellsType } from "../context/AccountActivationContext/AccountActivationContext";
import { IFullname } from "../redux/slices/ProfileSlice/profileSlice.types";
import { IPost, SalaryType } from "../types/types";
import moment from "moment";
import { baseUrl } from "../constants/constants";

export const getValidateStatus = (error: string | undefined) =>
	error ? "error" : undefined;

export const shortDelay = (delayInSec: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, delayInSec * 1000);
	});

export const formRequiredMessage = (fieldName: string) =>
	`${fieldName} is required`;

export const toBase64 = (img: any, callback: any) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
};

export const isEmptyString = (str: string) => str.length === 0;

export const isNull = (val: any) => val === null;

export const formatSalary = (salary: SalaryType) => {
	if (typeof salary === "string") {
		return salary;
	} else {
		return `${salary.lowerBound} - ${salary.upperBound}`;
	}
};

export const convertCodeCellsToCapitals = (codeCells: CellsType) => {
	return codeCells.map((char) => char.toUpperCase());
};

export const PostCreateUpdateConfirmationModal = (
	{
		title,
		description,
		salary,
		type,
		remote,
		application_link,
	}: Omit<IPost, "company_name" | "id" | "status" | "governorate">,
	onConfirm: (...args: any[]) => any,
	operation: "create" | "update"
) => {
	let content;
	if (operation === "create") {
		content = "are you sure you want to post it ?\n";
	} else {
		content = "are you sure you want to update this post ?\n";
	}
	content += `
		Title :\n${title}\n
		Type :\n${type}\n
		Remote :\n${remote ? "Yes" : "No"}\n
		Salary :\n${formatSalary(salary)}\n
		Description :\n${description}\n
		ApplicationLink :\n${application_link}\n
		`;
	Modal.confirm({
		title: "Post",
		content,
		onOk: onConfirm,
		centered: true,
		bodyStyle: {
			padding: "4em",
			whiteSpace: "pre-line",
			overflowY: "scroll",
			maxHeight: "90vh",
		},
	});
	setTimeout(() => {
		document.getElementsByClassName("ant-modal-body")[0].scrollTo(0, 0);
	}, 50);
};

export const formUserFullName = ({
	firstName,
	middleName,
	lastName,
}: IFullname) => {
	return `${firstName} ${middleName ? middleName : ""} ${lastName}`
		.replace(/\s{2,}/g, " ")
		.trim();
};

export const getTodayDate = () => {
	return new Date();
};

export const getProfilePicturePath = (profilePicture: string) => {
	return `${baseUrl}/profile${profilePicture}`;
};

export const appendDateToForceFetchProfilePicture = (
	profilePicture: string
) => {
	return `${profilePicture}?${Date.now()}`;
};
