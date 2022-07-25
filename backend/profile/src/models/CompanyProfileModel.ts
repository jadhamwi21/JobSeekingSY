import { model, Schema } from "mongoose";
import { ICompany } from "../types/types";

const schema = new Schema<ICompany>({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	governorate: { type: String, required: true },
});

export const Companies = model<ICompany>(
	"companies_profiles",
	schema,
	"companies_profiles"
);
