import { MongooseError } from "mongoose";
import { ErrorNotification } from "../models/ErrorNotification";
import { Users } from "../models/UserModel";

export const usernameExists = async (username: string) => {
	try {
		const user = await Users.findOne({ username });
		if (user) return true;
		return false;
	} catch (_e) {
		const e: Error = _e;
		throw e;
	}
};

export const emailInUse = async (email: string) => {
	try {
		const user = await Users.findOne({ email });
		if (user) return true;
		return false;
	} catch (_e) {
		const e: Error = _e;
		throw e;
	}
};

export const SignupService = {
	usernameExists,
	emailInUse,
};
