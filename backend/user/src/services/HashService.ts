import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword: string) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(plainPassword, salt);
	return hashedPassword;
};

export const comparePassword = async (
	plainPassword: string,
	hashedPassword: string
) => {
	try {
		return await bcrypt.compare(plainPassword, hashedPassword);
	} catch (_e) {
		const e: Error = _e;
		throw e;
	}
};

export const HashService = {
	hashPassword,
	comparePassword,
};
