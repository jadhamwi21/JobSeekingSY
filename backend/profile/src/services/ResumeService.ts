import { base64Decode, base64Encode } from "base64topdf";
import { getResumeNameByUsername } from "../utils/utils";

const saveNewResume = (username: string, resume: string) => {
	const resumeSlice = resume.split(";base64,").pop();
	base64Decode(
		resumeSlice!,
		`data/resumes/${getResumeNameByUsername(username)}`
	);
};

const getResume = (username: string) => {
	const resume =
		"data:application/pdf;base64," +
		String(base64Encode(`data/resumes/${getResumeNameByUsername(username)}`));
	return resume;
};

export const ResumeService = {
	saveNewResume,
	getResume,
};
