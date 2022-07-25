import { model, Schema } from "mongoose";
import { ISeekerProfile } from "../types/types";

const schema = new Schema<ISeekerProfile>({
	username: { type: String, required: true, unique: true },
	first_name: { type: String, required: true },
	middle_name: { type: String },
	last_name: { type: String, required: true },
	profile_picture: { type: String },
	governorate: { type: String },
	profession: { type: String },
	bio: { type: String },
	resume: { type: String },
	isSetup: { type: Boolean, required: true },
});

export const SeekersProfiles = model<ISeekerProfile>(
	"seekers_profiles",
	schema,
	"seekers_profiles"
);
