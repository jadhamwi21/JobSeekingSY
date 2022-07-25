import { model, Schema } from "mongoose";
import { HashService } from "../services/HashService";
import { IUser, IUserModel } from "../types/types";
import { ErrorNotification } from "./ErrorNotification";

const schema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true, enum: ["Seeker", "Recruiter"] },
});

schema.pre("save", async function (next) {
	this.password = await HashService.hashPassword(this.password);
	next();
});

schema.statics.findUserByEmail = async function (email: string) {
	try {
		const user = await this.findOne({ email });
		if (!user)
			throw new ErrorNotification(
				"Login",
				401,
				"user with this email doesn't exist"
			);
		return user;
	} catch (_e) {
		const e: Error = _e;
		throw e;
	}
};

schema.statics.findUserByUsername = async function (username: string) {
	try {
		const user = await this.findOne({ username });
		if (!user)
			throw new ErrorNotification(
				"Login",
				401,
				"user with this username was not found"
			);
		return user;
	} catch (_e) {
		const e: Error = _e;
		throw e;
	}
};

export const Users = model<IUser, IUserModel>("users", schema, "users");
