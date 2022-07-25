import { model, Schema } from "mongoose";
import { IRecruiterProfile } from "../types/types";

const schema = new Schema<IRecruiterProfile>({
	username: { type: String, required: true, unique: true },
	first_name: { type: String, required: true },
	middle_name: { type: String },
	last_name: { type: String, required: true },
	profile_picture: { type: String },
	company_name: { type: String },
	isSetup: { type: Boolean, required: true },
});

export const RecruitersProfiles = model<IRecruiterProfile>(
	"recruiters_profiles",
	schema,
	"recruiters_profiles"
);
